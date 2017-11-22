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
      nemo: io(process.env.REACT_APP_SOCKET_NEMO, { forceNew: true })
    };
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

    this.sockets.nemo.on('cashier', data => {
      console.log('nemo:socket info = ', data);
      // проверка выбрано ли мероприятие арена, выбрано ли место
      const { eventId } = this.getState();

      if (!eventId) return;

      switch (data.event) {
        case 'remote-select-place'     : this.remoteSelectSeat(data); break;
        case 'remote-unselect-place'   : this.remoteUnSelectSeat(data); break;
        case 'add-reserv-many-tickets' : this.buyManyTickets(data.tickets); break;
        case 'set-places'              : this.setPlaces(data.places); break;

        default: console.log('hz event = ', data);
      }
    });
  }

  getState() {
    const state = this.store.getState();
    // console.log('state = ', state);
    return {
      eventId: state.form.stepper.values ? state.form.stepper.values.time : null
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
    console.log('tickets = ', tickets);
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
    const state = this.getState();

    seats.forEach(seat => {
      if (state.eventId === seat.event_id) {
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