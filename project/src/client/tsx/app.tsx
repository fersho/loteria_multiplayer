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
var Index = require('./pages/index/index.tsx').default;
import './../css/initialMenu/main.css';

export class App extends React.Component {
    render() {
        return (
            <Router>
              <Switch>
                <Route path="/">
                  <Index />
                </Route>
                <Route path="/users">
                  <Index />
                </Route>
                <Route path="/">
                  <Index />
                </Route>
              </Switch>
          </Router>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));