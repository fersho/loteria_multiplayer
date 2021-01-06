declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var StartMenuContainer = require('./startMenu.tsx').default;
var Card = require('./../loteriaCard/card.tsx').default;
import './../../css/initialMenu/main.css';

export class NewGame extends React.Component {
    render() {
        return (
            <div id="main-container">
                <img id="initial-menu-background-image" src="/images/loteriaBackground.jpg" alt=""/>
                <Card />
                <StartMenuContainer />
            </div>
            
        );
    }
}

ReactDOM.render(<NewGame />, document.getElementById('root'));