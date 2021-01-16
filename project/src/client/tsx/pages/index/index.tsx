declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var ButtonsContainer = require('./buttonsContainer.tsx').default;
import './../../../css/initialMenu/main.css';

export class Index extends React.Component {
    render() {
        return (
                <div id="main-container">
                    <img id="initial-menu-background-image" src="/images/loteriaBackground.jpg" alt=""/>
                    <ButtonsContainer />
                </div>                                 
        );
    }
}

ReactDOM.render(<Index />, document.getElementById('root'));