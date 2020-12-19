declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import './../../css/loteriaCard/element.css';

export default class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indicator: null
        };
    };
    
    render() {
        return (
            <div className="loteria-card-element" onClick={this.handleClick.bind(this)}>
                <img className="loteria-card-element-image" src={this.props.image} alt=""/>
            </div>
        );
    }
    handleClick(event) {
        this.addIndicator(event.target);
    }
    addIndicator(elem) {
        if(this.state.indicator) {
            this.state.indicator.parentElement.removeChild(this.state.indicator);
            this.state.indicator = null;
        }else {
            var img = document.createElement('img'); 
            img.className = 'loteria-card-element-image-indicator';
            img.src = '/images/indicator/bean.png'; 
            elem.parentElement.appendChild(img); 
            this.state.indicator = img;
        }
       
    }
}


