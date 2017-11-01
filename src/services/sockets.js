import io from 'socket.io-client';

import { otherSelect, otherUnSelect } from '../actions/seats';

class Sockets {

  constructor(store) {
    this.store = store;
    this.sockets = {
      api: io(process.env.REACT_APP_SOCKET_API, { forceNew: true }),
      nemo: io(process.env.REACT_APP_SOCKET_NEMO, { forceNew: true })
    };
    this.eventListeners();
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
      if (eventId !== data.event_id) return;
      switch (data.event) {
        case 'remote-select-place': this.remoteSelectSeat(data); break;
        case 'remote-unselect-place': this.remoteUnSelectSeat(data); break;

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
    this.store.dispatch(otherSelect({
      dataId: data.data_id,
      socketId: data.socket_id
    }));
  }

  remoteUnSelectSeat(data) {
    /*
     * удалённое снятие выбранного места
     */
    this.store.dispatch(otherUnSelect({
      dataId: data.data_id,
      socketId: data.socket_id
    }));
  }

}

export default Sockets;