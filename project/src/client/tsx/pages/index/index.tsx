declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var {   
    Link,
} = require("react-router-dom");
var socket = require('./../../../../../node_modules/socket.io/client-dist/socket.io.js')();
import './../../../css/pages/index.css';

let userName = "";

export default class Index extends React.Component {
    constructor() {
        super()
        this.nameField = React.createRef()
    }
    render() {
        return (
            <div className="initial-menu-buttons-container" >
                <div class="form__group">
                    <input ref={this.nameField} type="text" class="form__input" id="user-name" placeholder="Nombre de Usuario o sala a unirse" required="" />
                    <label for="name" class="form__label">Nombre de Usuario o sala a unirse</label>
                </div>

                <button className="initial-menu-button" id="initial-menu-start-game" onClick={this.handleClick.bind(this)}>Crear juego</button>
                <button className="initial-menu-button" id="initial-menu-join-game" onClick={this.handleClick.bind(this)}>Unirse a un juego</button>
            </div>
        );
    }
    handleClick(event) {
        let elem = event.target;
        if(elem.id == "initial-menu-start-game") {
            console.log(this.nameField.current.value);
            let userCreated = this.newUserConnected();
            if(userCreated) {
                this.props.history.push("/new-game");
                //window.location.href = "/new-game";
            }else {
                alert("Escribe tu nombre de usuario");
            }
            console.log("pressed start game");
        }else {
            console.log("pressed join game");
        }
    }


    newUserConnected() {
        console.log(socket);
        if(this.nameField.current.value.trim().length > 0) {
            socket.emit("new user", this.nameField.current.value);
            return true;
        }
        return false;
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


