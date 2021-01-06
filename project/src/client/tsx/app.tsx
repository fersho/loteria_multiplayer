declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var ButtonsContainer = require('./initialMenu/buttonsContainer.tsx').default;
import './../css/initialMenu/main.css';

export class App extends React.Component {
    render() {
        return (
            <div id="main-container">
                <img id="initial-menu-background-image" src="/images/loteriaBackground.jpg" alt=""/>
                <ButtonsContainer />
            </div>
            
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));