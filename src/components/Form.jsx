import React from 'react';

class Form extends React.Component {
  render() {
    return (
      <>
        <input type="text" data-testid="name-input" />
        <textarea data-testid="description-input" name="descricao" id="descricao" cols="30" rows="10" />
        <input type="number" data-testid="attr1-input" />
        <input type="number" data-testid="attr2-input" />
        <input type="number" data-testid="attr3-input" />
        <input type="text" data-testid="image-input" />
        <select name="raridade" id="raridade" data-testid="rare-input">
          <option value="normal">Normal</option>
          <option value="raro">Raro</option>
          <option value="muito raro">Muito Raro</option>
        </select>
        <input type="checkbox" data-testid="trunfo-input" />
        <button type="submit" data-testid="save-button">Salvar</button>
      </>
    );
  }
}

export default Form;
