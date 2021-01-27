declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');

export default class StartMenuContainer extends React.Component {
 
    render() {
        return (
            <div className="start-game-menu-buttons-container" >
                <button className="initial-menu-button" id="initial-menu-initialize-game" onClick={this.handleClick.bind(this)}>Iniciar</button>
                <button className="initial-menu-button" id="initial-menu-end-game" onClick={this.handleClick.bind(this)}>Terminar</button>
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


