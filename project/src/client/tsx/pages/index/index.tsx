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
        super();
        this.nameField = React.createRef();
        this.roomField = React.createRef();
        socket.on("room created", (roomName) => {
            this.roomField.current.value = roomName;
        });
    }
    render() {
        return (
            <div className="initial-menu-buttons-container" >
                <div className="form__group">
                    <input ref={this.nameField} type="text" className="form__input" id="user-name" placeholder="Nombre de usuario" required="" />
                    <label htmlFor="name" className="form__label">Nombre de Usuario</label>
                </div>
                <button className="initial-menu-button" id="initial-menu-start-game" onClick={this.handleClick.bind(this)}>Crear juego</button>
                <div className="form__group">
                    <input ref={this.roomField} type="text" className="form__input" id="user-name" placeholder="Nombre de sala" required="" />
                    <label htmlFor="name" className="form__label">Nombre de sala</label>
                </div>
                <button className="initial-menu-button" id="initial-menu-join-game" onClick={this.handleClick.bind(this)}>Unirse a un juego</button>
            </div>
        );
    }
    handleClick(event) {
        let elem = event.target;
        if(elem.id == "initial-menu-start-game") {
            console.log(this.nameField.current.value);
            let userCreated = this.newUserConnected();
            if(!userCreated) {
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
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userName: this.nameField.current.value })
            };
            fetch('/api/room', requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result);
                    if(result) {
                        let jsonResponse = result;
                        this.props.history.push({pathname: "/new-game", state: {userName: this.nameField.current.value, roomName: jsonResponse.room.name}});

                    } else {
                      console.log('Respuesta de red OK pero respuesta HTTP no OK');
                    }
                });
            //socket.emit("create room", this.nameField.current.value);
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


