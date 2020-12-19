declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var Element = require('./element.tsx').default;
import './../../css/loteriaCard/card.css';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      elements: []
    };
  };

  componentDidMount() {
    fetch("/service/card")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            elements: result
          });
        },
        // Nota: es importante manejar errores aquí y no en 
        // un bloque catch() para que no interceptemos errores
        // de errores reales en los componentes.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  };


  render() {
    const { error, isLoaded, elements } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
          <div className="loteria-card">
              {this.renderElements(elements)}
          </div>
      );   
    }           
  };

  renderElements = (jsonCards) => {
      return jsonCards.map(card => {
        return <Element key={card.id} image={card.image} />;
      });
  };
}
