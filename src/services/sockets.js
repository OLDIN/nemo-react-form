import io from 'socket.io-client';

import {
  otherSelect,
  otherUnSelect,
  reservSeat,
  soldSeat,
} from '../actions/seats';

class Sockets {

  constructor(store) {
    this.store = store;
    this.sockets = {
      api: io(process.env.REACT_APP_SOCKET_API, { forceNew: true }),
      nemo: io(process.env.REACT_APP_SOCKET_NEMO, {
        forceNew: true,
        query: { online: true }
      })
    };
    console.log(process.env);
    this.eventListeners();
  }

  getSockets() {
    return this.sockets;
  }

  eventListeners() {

    this.sockets.api.once('connect', () => {
      console.log('API:socket connected');
    });

    this.sockets.nemo.once('connect', () => {
      console.log('NEMO:socket connected');
    });

    this.sockets.api.on('disconnect', () => {
      console.warn('Соединение с сервером пропало. Купленные места на арене могут отображаться некорректно');
    });

    this.sockets.nemo.on('disconnect', () => {
      console.warn('Соединение с сервером пропало. Купленные места на арене могут отображаться некорректно');
    });

    this.sockets.api.on('cashier', data => {
      console.log('api:socket info = ', data);
      // проверка выбрано ли мероприятие арена, выбрано ли место
      const { eventId } = this.getState();
      console.log('eventid = ', eventId);
      if (!eventId) return;

      switch (data.event) {
        case 'ticket-reserved'         : this.ticketReserved(data.tickets); break;
        case 'get-places'              : this.getPlaces(); break;
        case 'set-places'              : this.setPlaces(data.seats); break;
        case 'remote-select-place'     : this.remoteSelectSeat(data); break;
        case 'remote-unselect-place'   : this.remoteUnSelectSeat(data); break;
        case 'ticket-sold'             : this.ticketSold(data); break;

        default: console.log('hz event = ', data);
      }
    });

    this.sockets.nemo.on('cashier', data => {
      console.log('nemo:socket info = ', data);
      // проверка выбрано ли мероприятие арена, выбрано ли место
      const { eventId } = this.getState();

      if (!eventId || data.isOnlinePay) return;

      switch (data.event) {
        case 'remote-select-place'     : this.remoteSelectSeat(data); break;
        case 'remote-unselect-place'   : this.remoteUnSelectSeat(data); break;
        case 'add-reserv-many-tickets' : this.buyManyTickets(data.tickets); break;
        case 'set-places'              :
          if (!data.places || !data.places.length) {
            break;
          }
          this.setPlaces(data.places); break;
        case 'get-places'              : this.getPlaces(); break;

        default: console.log('hz event = ', data);
      }
    });

  }

  ticketSold(data) {
    const { eventId } = this.getState();
    console.log(data);
    data.tickets.forEach(ticket => {
      if (eventId === ticket.event.id) {
        this.store.dispatch(soldSeat({
          zone: ticket.zone,
          row: ticket.row,
          place: ticket.place
        }));
      }
    })
  }

  getPlaces() {
    const { basket } = this.getState();
    const seats = basket
      .filter(item => item.isArena)
      .map(seat => {
        return { data_id: seat.dataId, event_id: seat.id };
      })
    this.sockets.api.emit('online-pay', { event: 'set-places', places: seats });
  }

  ticketReserved(tickets) {
    const { eventId } = this.getState();

    if (!eventId) return;

    tickets.forEach(ticket => {
      if (eventId === ticket.event.id) {
        console.log('event == event');
        this.store.dispatch(reservSeat({
          zone: ticket.zone,
          row: ticket.row,
          place: ticket.place
        }));
      }
    });
  }

  getState() {
    const state = this.store.getState();
    // console.log('state = ', state);
    return {
      eventId: state.form.stepper.values ? state.form.stepper.values.time : null,
      basket: state.basket
    };
  }

  remoteSelectSeat(data) {
    /*
    * удалённый выбор места
    */
    const { eventId } = this.getState();

    if (eventId !== data.event_id) return;

    this.store.dispatch(otherSelect({
      dataId: data.data_id,
      socketId: data.socket_id
    }));
  }

  remoteUnSelectSeat(data) {
    /*
     * удалённое снятие выбранного места
     */
    const { eventId } = this.getState();

    if (eventId !== data.event_id) return;

    this.store.dispatch(otherUnSelect({
      dataId: data.data_id,
      socketId: data.socket_id
    }));
  }

  buyManyTickets(tickets) {
    /*
    * подсвет купленного места
    */
    tickets.forEach(t => {
      t.ticket_events.forEach(te => {
        if (te.event.events_global.group_id === 1 && te.zone === +process.env.REACT_APP_ROW_FOR_PAY) {
          if (t.reserved) {

            this.store.dispatch(reservSeat({
              zone: te.zone,
              row: te.row,
              place: te.place
            }));

          } else {

            this.store.dispatch(soldSeat({
              zone: te.zone,
              row: te.row,
              place: te.place
            }));

          }

        }
      });
    });
  }

  setPlaces(seats) {
    /*
    * установка статуса "выбрано другим кассиром" для мест на арене
    */
    const { eventId } = this.getState();

    seats.forEach(seat => {
      if (eventId === seat.event_id) {
        // выставляем место как выбранное другим кассиром
        this.store.dispatch(otherSelect({
          dataId: seat.data_id,
          socketId: seat.socket_id
        }));
      }
    });
  }

}

export default Sockets;