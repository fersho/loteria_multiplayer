declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export default class ButtonsContainer extends React.Component {
 
    render() {
        return (
            <div className="initial-menu-buttons-container" >
                <button className="initial-menu-button" id="initial-menu-start-game" onClick={this.handleClick.bind(this)}>Crear juego</button>
                <button className="initial-menu-button" id="initial-menu-join-game" onClick={this.handleClick.bind(this)}>Unirse a un juego</button>
            </div>
        );
    }
    handleClick(event) {
        let elem = event.target;
        if(elem.id == "initial-menu-start-game") {
            console.log("pressed start game");
        }else {
            console.log("pressed join game");
        }
    }
   
}


