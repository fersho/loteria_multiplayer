declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var socket = require('./../../../../node_modules/socket.io/client-dist/socket.io.js');
let userName = "";

export default class ButtonsContainer extends React.Component {
 
    render() {
        this.newUserConnected();
        return (
            <div className="initial-menu-buttons-container" >
                <label htmlFor="">Nombre:</label>
                <input id="user-name" type="text"/>
                <button className="initial-menu-button" id="initial-menu-start-game" onClick={this.handleClick.bind(this)}>Crear juego</button>
                <button className="initial-menu-button" id="initial-menu-join-game" onClick={this.handleClick.bind(this)}>Unirse a un juego</button>
            </div>
        );
    }
    handleClick(event) {
        let elem = event.target;
        if(elem.id == "initial-menu-start-game") {
            window.location.href = "/new-game";
            console.log("pressed start game");
        }else {
            console.log("pressed join game");
        }
    }


    newUserConnected() {
        console.log(socket);
        userName = `User${Math.floor(Math.random() * 1000000)}`;
        socket.emit("new user", userName);
        //this.addToUsersBox(userName);
    }

    addToUsersBox(userName) {
        let inboxPeople = document.querySelector(".inbox__people");

        if (!!document.querySelector(`.${userName}-userlist`)) {
            return;
        }

        const userBox = `
            <div class="chat_ib ${userName}-userlist">
            <h5>${userName}</h5>
            </div>
        `;
        inboxPeople.innerHTML += userBox;
    }
   
}


