import React from 'react';
import PropTypes from 'prop-types';

class Form extends React.Component {
  render() {

    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      // hasTrunfo,
      isSaveButtonDisabled,
      onInputChange,
      onSaveButtonClick,
    } = this.props;

    return (
      <form>
        <input
          type="text"
          data-testid="name-input"
          value={ cardName }
          onChange={ onInputChange }
        />

        <textarea
          data-testid="description-input"
          name="descricao"
          id="descricao"
          value={ cardDescription }
          onChange={ onInputChange }
          cols="30"
          rows="10"
        />

        <input
          type="number"
          data-testid="attr1-input"
          value={ cardAttr1 }
          onChange={ onInputChange }
        />

        <input
          type="number"
          data-testid="attr2-input"
          value={ cardAttr2 }
          onChange={ onInputChange }
        />
        <input
          type="number"
          data-testid="attr3-input"
          value={ cardAttr3 }
          onChange={ onInputChange }
        />
        <input
          type="text"
          data-testid="image-input"
          value={ cardImage }
          onChange={ onInputChange }
        />

        <label htmlFor="raridade">
          <select
            name="raridade"
            id="raridade"
            data-testid="rare-input"
            checked={ cardRare }
            onChange={ onInputChange }
          >
            <option  value="normal" > Normal </option>
            <option
              value="raro" 
            >
              Raro
            </option>
            <option
              value="muito raro"
            >
              Muito Raro
            </option>
          </select>
        </label>

        <input
          type="checkbox"
          data-testid="trunfo-input"
          checked={ cardTrunfo }
          onChange={ onInputChange }
        />
        Sim

        <button
          type="submit"
          data-testid="save-button"
          disabled={ isSaveButtonDisabled }
          onClick={ onSaveButtonClick }
        >
          Salvar
        </button>
      </form>
    );
  }
}

Form.propTypes = {
  cardName: PropTypes.string.isRequired,
  cardDescription: PropTypes.string.isRequired,
  cardAttr1: PropTypes.string.isRequired,
  cardAttr2: PropTypes.string.isRequired,
  cardAttr3: PropTypes.string.isRequired,
  cardImage: PropTypes.string.isRequired,
  cardRare: PropTypes.string.isRequired,
  cardTrunfo: PropTypes.bool.isRequired,
  isSaveButtonDisabled: PropTypes.bool.isRequired,
  onInputChange: PropTypes.func.isRequired,
  onSaveButtonClick: PropTypes.func.isRequired,
};

export default Form;
