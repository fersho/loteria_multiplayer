declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
import './../../css/loteriaCard/element.css';

export default class Element extends React.Component {
    render() {
        return (
            <div className="loteria-card-element">
                <img className="loteria-card-element-image" src={this.props.image} alt=""/>
            </div>
        );
    }
}


