import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { find } from 'lodash';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';

import DataStep   from './components/steps/date-step';
import EventStep  from './components/steps/event-step';
import ArenaStep  from './components/steps/arena-step';
import ListStep   from './components/steps/list-step';
import BuyStep    from './components/steps/buy-step';

import { pushEvent } from './actions/basket';

import { reduxForm } from 'redux-form';
import validate from './components/validate';

import { createTicket } from './services/api/ticket';
import { addMsg } from './actions/notif';

/**
 * A basic vertical non-linear implementation
 */
class MDSteppers extends Component {

  constructor(props) {
    super(props);

    this.handleNext = this.handleNext.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.changeStep = this.changeStep.bind(this);
    this.handleCreateTicket = this.handleCreateTicket.bind(this);

    this.state = {
      stepIndex: 0,
    };
  }


  handleNext() {
    const { stepIndex } = this.state;
    const { events } = this.props;
    // если выбрана не арена
    if (stepIndex === 1 && !this.isSelectedArena()) {
      // ищем мероприятие
      const event = find(events, { selected: true });

      if (!event) {
        return console.log('Мероприятие не было найдено. Попробуйте позже');
      }
      // заносим мероприятие в корзину
      this.props.dispatch(pushEvent({
        id: event.id,
        dateStart: event.date_start,
        isArena: event.events_global.gevent_group.isArena,
        name: event.events_global.name,
        price: event.price,
        icon: event.events_global.onlinePaymentIcon
      }));
      // переходим к выводу корзины
      return this.setState({ stepIndex: 3 });
    }
    if (stepIndex < 4) {
      this.setState({ stepIndex: stepIndex + 1 });
    }
  }

  handlePrev () {
    const { stepIndex } = this.state;

    if (stepIndex > 0) {
      this.setState({ stepIndex: stepIndex - 1 });
    }
  }

  changeStep(stepIndex) {
    const { events, basket } = this.props;
    // если мероприятия не были загружены запрещаем переход по нажатию на шапку step'а
    if (!events.length) return;
    // если это переход в "оформить заказ" и не было выбрано для покупки ни одног омероприятия то запрещаем переход
    if (stepIndex === 4 && !basket.length) return;
    // переходим
    this.setState({ stepIndex });
  }

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        {step !== 4 &&
        (<RaisedButton
          label="Далее"
          disableFocusRipple={true}
          primary={true}
          onClick={this.handleNext}
          style={{marginRight: 12}}
        />)
        }
        {step > 0 &&
        (<FlatButton
            label="Назад"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
          />)
        }
        {step === 3 &&
        (<RaisedButton
              label="Выбрать еще услуги"
              disableFocusRipple={true}
              primary={true}
              onClick={() => {
                this.setState({stepIndex: 1});
              }}
              style={{marginLeft: 10, marginRight: 10}}
            />)
        }
        {step === 4 &&
        (<RaisedButton
            label="Купить"
            disableFocusRipple={true}
            secondary={true}
          />)
        }
      </div>
    );
  }

  goToPay(data, signature) {

    const form = document.createElement('form');
    const inputData = document.createElement('input');
    const inputSignature = document.createElement('input');
    const buttonSubmit = document.createElement('button');

    form.method = 'POST';
    form.action = 'https://www.liqpay.ua/api/3/checkout';
    form.target = '_top';
    form.id = 'formPayment';

    inputData.type = 'hidden';
    inputData.name = 'data';
    inputData.value = data;

    inputSignature.type = 'hidden';
    inputSignature.name = 'signature';
    inputSignature.value = signature;

    buttonSubmit.style = 'display: none';

    form.appendChild(inputData);
    form.appendChild(inputSignature);
    form.appendChild(buttonSubmit);

    const oldForm = document.getElementById('formPayment');

    if (oldForm) {
      document.body.removeChild(oldForm);
    }

    document.body.appendChild(form);
    form.submit();

  }

  isSelectedArena() {
    const event = find(this.props.events, e => {
      return e.selected && e.events_global.gevent_group.isArena;
    });

    return event ? true : false;
  }

  handleCreateTicket(values) {
    const { basket } = this.props;
    const totalPrice = basket.reduce((prev, cur) => prev += cur.price, 0);

    if (totalPrice <= 0) {
      return this.props.dispatch(addMsg({ msg: 'Нужно выбрать хоть одно мероприятие.', msgType: 'error' }));
    }

    return createTicket(values, basket)
    .then(data => {
      if (data.error) {
        return this.props.dispatch(addMsg({ msg: data.msg, msgType: 'error' }));
      }
      // отправляем пользователя оплачивать билеты
      this.goToPay(data.info.data, data.info.signature);
      console.log('data after create ticket = ', data);
    })
    .catch(err => {
      console.log('create ticket error = ', err);
    });

  }

  render() {
    const { stepIndex } = this.state;
    const { basket } = this.props;

    return (
      <div className={"wrapper"}>
        <Stepper
          activeStep={stepIndex}
          linear={false}
          orientation="vertical"
        >
          <Step>
            <StepButton onClick={() => this.setState({ stepIndex: 0 })}>
              Выберите дату:
            </StepButton>
            <StepContent>
              <DataStep onSubmit={this.handleNext} />
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.changeStep(1)}>
              Выберите мероприятие:
            </StepButton>
            <StepContent>
              <EventStep onSubmit={this.handleNext} handlePrev={this.handlePrev} />
            </StepContent>
          </Step>

          { this.isSelectedArena() ?
            <Step>
              <StepButton onClick={() => this.changeStep(2)}>
                Шоу
              </StepButton>
              <StepContent>
                <ArenaStep onSubmit={this.handleNext} handlePrev={this.handlePrev} />
              </StepContent>
            </Step> : <div></div>
          }

          <Step>
            <StepButton onClick={() => this.changeStep(3)}>
              <Badge
                badgeContent={basket.length}
                primary={true}
              >
                <NotificationsIcon />
                Бронь:
              </Badge>
            </StepButton>
            <StepContent>
              <ListStep />
              {this.renderStepActions(3)}
            </StepContent>
          </Step>

          <Step>
            <StepButton onClick={() => this.changeStep(4)}>
              Оформить заказ:
            </StepButton>
            <StepContent>
              <BuyStep onSubmit={this.handleCreateTicket} handlePrev={this.handlePrev}  />
            </StepContent>
          </Step>
        </Stepper>
      </div>
    );
  }
}

MDSteppers.propTypes = {
  events: PropTypes.array.isRequired,
  basket: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  return {
    events: state.events,
    basket: state.basket
  };
}

MDSteppers = reduxForm({
  form: 'stepper', // <------ same form name
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(MDSteppers);

export default connect(mapStateToProps)(MDSteppers);