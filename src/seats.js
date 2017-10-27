import React, { Component } from 'react';

class Seats extends Component {

  constructor(props) {
    super(props);

    this.state = {
      limitSeats: {
        1: 21,
        2: 23,
        3: 26,
        4: 28,
        5: 26
      }
    };
  }

  createSeatsNumbers(num) {
    let arr = [];
    for (let i = 1; i <= num; i++) {
      arr.push(i);
    }
    return arr;
  }

  render(){
    return(
      <section className={"seats-wrapper"}>
        <div className={"seats"}>
          <p>Ряд/место</p>
          {
            [5, 4, 3, 2, 1].map(row => {
              return (
                <div className={"seats-row"}>
                  <div className="seat-row" key={row}>{row}</div>

                  {
                    this.createSeatsNumbers(this.state.limitSeats[row]).map(seat =>
                      <div className="seat" key={seat} data-seat={seat}>{seat}</div>
                    )
                  }

                  <div className="seat-row" key={row}>{row}</div>
                </div>
              )
            })
          }
        </div>
        <div className={"pool"}>
          <span>Бассейн</span>
        </div>
      </section>
    );
  }

}

export default Seats;
