import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      isSaveButtonDisabled: true,
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.disableSaveButton = this.disableSaveButton.bind(this);
  }

  onInputChange({ target: { value, name, type, checked } }) {
    const result = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: result,
    }, this.disableSaveButton);
  }

  verifyAttrs = () => {
    const { cardAttr1, cardAttr2, cardAttr3 } = this.state;
    const arrayAttrs = [cardAttr1, cardAttr2, cardAttr3];
    const limitUnit = 90;
    const limitSum = 210;
    let control = false;
    const isValidAttr = arrayAttrs.every((attr) => Number(attr) <= limitUnit);
    if (Number(cardAttr1) + Number(cardAttr2) + Number(cardAttr3) <= limitSum) {
      control = true;
    }
    const positiveNumbers = arrayAttrs.every((attr) => Number(attr) >= 0);
    return positiveNumbers && isValidAttr && control;
  }

  verifyInputs = () => {
    const { cardName, cardImage, cardDescription, cardRare } = this.state;
    const arrayInputs = [cardName, cardImage, cardDescription, cardRare];
    const notEmpty = arrayInputs.every((input) => input.length > 0);
    return notEmpty;
  }

  disableSaveButton() {
    if (this.verifyAttrs() && this.verifyInputs()) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  render() {
    return (
      <>
        <Form { ...this.state } onInputChange={ this.onInputChange } />
        <Card { ...this.state } />
      </>
    );
  }
}

export default App;
