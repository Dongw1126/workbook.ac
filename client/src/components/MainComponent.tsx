import { BrowserRouter, Route, Switch } from "react-router-dom";
import CreateWorkbook from "../pages/CreateWorkbook"
import Info from "../pages/Info"
import Nav from "../pages/Nav"

function MainComponent() {
    return (
        <BrowserRouter>
            <Nav/>
            <Switch>
                <Route exact path="/" component={CreateWorkbook} />
                <Route exact path="/info" component={Info} />
            </Switch>
        </BrowserRouter>
    );
}

export default MainComponent;
