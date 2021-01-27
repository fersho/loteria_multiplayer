declare var require: any

var React = require('react');
var ReactDOM = require('react-dom');
var {
    BrowserRouter,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } = require("react-router-dom");
var Router = BrowserRouter;
var NewGame = require('./pages/newGame/newGame.tsx').default;
var Index = require('./pages/index/index.tsx').default;
import './../css/initialMenu/main.css';

export class App extends React.Component {
    render() {
        return (
            <Router>
               <div id="main-container">
                    <img id="initial-menu-background-image" src="/images/loteriaBackground.jpg" alt=""/>
                    <Switch>           
                      <Route exact path="/" component={Index} />           
                      <Route path="/new-game" component={NewGame} />
                    </Switch>
                </div>                 
          </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));