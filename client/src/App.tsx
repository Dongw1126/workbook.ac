import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Main from "./pages/Main"
import Info from "./pages/Info"
import Nav from "./pages/Nav"

function App() {
  return (
    <BrowserRouter>
      <Nav/>
      <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/info" component={Info} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;