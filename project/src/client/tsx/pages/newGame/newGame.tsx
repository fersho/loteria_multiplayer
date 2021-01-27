declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var StartMenuContainer = require('./startMenu.tsx').default;
var Card = require('./../../loteriaCard/card.tsx').default;
import './../../../css/initialMenu/main.css';
import './../../../css/newGame/newGame.css';

export default class NewGame extends React.Component {
    render() {
        return (
                <div id="menu-container">
                    <h1>{this.props.location.state.userName} Elige tu carta</h1>
                    <Card />
                    <StartMenuContainer />
                </div>            
        );
    }
}