declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
const se = require('./../../css/loteriaCard/element.css');

export default class Element extends React.Component {
    render() {
        return (
            <div className="loteria-card-element">
                <img className="loteria-card-element-image" src="https://thumbs.dreamstime.com/b/loter%C3%A3a-mexicana-el-borracho-imagen-de-alta-resoluci%C3%B3n-100154971.jpg" alt=""/>
            </div>
        );
    }
}


