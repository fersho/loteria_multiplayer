declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var Element = require('./loteriaCard/element.tsx');

export class Hello extends React.Component {
    render() {
        return (
            <div>
                <h1>Welcome to React!!</h1>
                <Element />
            </div>
            
        );
    }
}

ReactDOM.render(<Hello />, document.getElementById('root'));