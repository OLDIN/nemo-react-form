import React, { Component } from 'react';
import PropTypes from 'prop-types';

import FirstPage from './components/steps/first-page';
import SecondPage from './components/steps/second-page';
import ThirdPage from './components/steps/third-page';



class Steppers extends Component {

  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.state = {
      page: 1
    }
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }

  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 &&
        <FirstPage
          onSubmit={this.nextPage}
        />}
        {page === 2 &&
        <SecondPage
          previousPage={this.previousPage}
          onSubmit={this.nextPage}
        />}
        {page === 3 &&
        <ThirdPage
          previousPage={this.previousPage}
          onSubmit={onSubmit}
        />}
      </div>
    )
  }
}

Steppers.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default Steppers;