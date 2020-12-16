declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import './../css/elementVisualizer.css';

export default class ElementVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          error: null,
          isLoaded: false,
          elements: []
        };
    };
    componentDidMount() {
        this.interval = setInterval(() => this.downloadNewElement(), 4000);
    }
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    downloadNewElement() {
        fetch("/service/random_element")
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                isLoaded: true,
                element: result
                });
            },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
                console.log(error);
                // this.setState({
                // isLoaded: true,
                // error
                // });
            }
        )
    }

    render() {
        const { error, isLoaded, element } = this.state;
        if (error) {
          return <div className="loteria-element-visualizer">Error: {error.message}</div>;
        } else if (!isLoaded) {
          return <div className="loteria-element-visualizer">Loading...</div>;
        } else {
            return (
                <div className="loteria-element-visualizer">
                    <img className="loteria-element-visualizer-image" src={element.image} alt=""/>
                </div>
            );
        }
    }
}


