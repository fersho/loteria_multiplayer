declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var Card = require('./loteriaCard/card.tsx').default;
var ElementVisualizer = require('./elementVisualizer.tsx').default;

export class Game extends React.Component {
    render() {
        console.log(Element);
        return (
            <div>
                <h1>Welcome to Loteria!!</h1>
                <ElementVisualizer />
                <Card />
            </div>
            
        );
    }
}

ReactDOM.render(<Game />, document.getElementById('root'));