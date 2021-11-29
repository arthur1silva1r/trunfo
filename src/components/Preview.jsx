import React from 'react';
import PropTypes from 'prop-types';
import Card from './Card';

class Preview extends React.Component {
  render() {
    const { arrayCards, removeCard } = this.props;
    return (
      <>
        {
          arrayCards.map((el, index) => (
            <div key={ index }>
              <Card
                cardName={ el.cardName }
                cardDescription={ el.cardDescription }
                cardAttr1={ el.cardAttr1 }
                cardAttr2={ el.cardAttr2 }
                cardAttr3={ el.cardAttr3 }
                cardImage={ el.cardImage }
                cardRare={ el.cardRare }
                cardTrunfo={ el.cardTrunfo }
              />
              <button
                type="submit"
                data-testid="delete-button"
                onClick={ () => removeCard(index) }
              >
                Excluir
              </button>
            </div>
          ))
        }
      </>
    );
  }
}

Preview.propTypes = {
  arrayCards: PropTypes.arrayOf(
    PropTypes.shape({
      cardName: PropTypes.string.isRequired,
      cardDescription: PropTypes.string.isRequired,
      cardAttr1: PropTypes.string.isRequired,
      cardAttr2: PropTypes.string.isRequired,
      cardAttr3: PropTypes.string.isRequired,
      cardImage: PropTypes.string.isRequired,
      cardRare: PropTypes.string.isRequired,
      cardTrunfo: PropTypes.bool.isRequired,
    }),
  ),
  removeCard: PropTypes.func,
};

Preview.defaultProps = {
  arrayCards: [],
  removeCard: PropTypes.func,
};

export default Preview;
