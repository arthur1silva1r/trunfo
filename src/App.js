import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      arrayCards: [],
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      filterInputName: '',
      filterInputRare: '',
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.disableSaveButton = this.disableSaveButton.bind(this);
  }

  onInputChange({ target: { value, name, type, checked } }) {
    const result = type === 'checkbox' ? checked : value;
    this.setState({
      [name]: result,
    }, () => this.disableSaveButton());
  }

  onSaveButtonClick = (event) => {
    event.preventDefault();
    const { cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo } = this.state;

    const newCard = {
      cardName,
      cardImage,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardRare,
      cardTrunfo,
    };

    this.setState((state) => {
      const { arrayCards } = state;
      return {
        cardName: '',
        cardImage: '',
        cardDescription: '',
        cardAttr1: '0',
        cardAttr2: '0',
        cardAttr3: '0',
        cardRare: 'normal',
        cardTrunfo: false,
        saveButton: true,
        hasTrunfo: state.hasTrunfo || cardTrunfo,
        arrayCards: [...arrayCards, newCard],
      };
    });
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

  deleteByFiltering = (toDelete) => {
    const { arrayCards } = this.state;
    const arrayAfterDel = arrayCards.filter((el) => el.cardName !== toDelete);
    this.setState({ arrayCards: arrayAfterDel }, () => this.existTrunfo());
  }

  existTrunfo = () => {
    const { arrayCards } = this.state;
    const exist = arrayCards.some(({ cardTrunfo: result }) => result === true);
    if (exist) {
      this.setState({ hasTrunfo: true });
    } else {
      this.setState({ hasTrunfo: false });
    }
  }

  disableSaveButton() {
    if (this.verifyAttrs() && this.verifyInputs()) {
      this.setState({ isSaveButtonDisabled: false });
    } else {
      this.setState({ isSaveButtonDisabled: true });
    }
  }

  render() {
    const { arrayCards,
      filterInputName,
      filterInputRare } = this.state;
    return (
      <>
        <Form
          { ...this.state }
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
        />
        <Card { ...this.state } preview />
        <input
          type="text"
          name="filterInputName"
          id="filterInputName"
          value={ filterInputName }
          onChange={ this.onInputChange }
          data-testid="name-filter"
        />
        <select
          data-testid="rare-filter"
          id="rare"
          type="select"
          name="filterInputRare"
          value={ filterInputRare }
          onChange={ this.onInputChange }
        >
          <option value="todas" selected> todas </option>
          <option value="normal"> normal </option>
          <option value="raro"> Raro </option>
          <option value="muito raro"> muito raro </option>
        </select>
        {
          arrayCards.length !== 0 ? (
            arrayCards
              .filter(({ cardName: nameCard }) => nameCard.includes(filterInputName))
              .filter(({ cardRare: rarity }) => (
                filterInputRare === 'todas' || filterInputRare === ''
                  ? true : rarity === filterInputRare
              ))
              .map((und, index) => (
                <Card
                  key={ index }
                  preview={ false }
                  cardName={ und.cardName }
                  cardDescription={ und.cardDescription }
                  cardAttr1={ und.cardAttr1 }
                  cardAttr2={ und.cardAttr2 }
                  cardAttr3={ und.cardAttr3 }
                  cardImage={ und.cardImage }
                  cardRare={ und.cardRare }
                  cardTrunfo={ und.cardTrunfo }
                  deleteByFiltering={ this.deleteByFiltering }
                />
              ))
          ) : null
        }
      </>
    );
  }
}
export default App;
