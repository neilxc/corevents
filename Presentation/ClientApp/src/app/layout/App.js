import React, {Component, Fragment} from 'react';
import {Container} from "semantic-ui-react";
import {Route, Switch} from "react-router-dom";
import {Counter} from "../../features/counter/Counter";
import {FetchData} from "../../features/fetchdata/FetchData";
import {Home} from "../../features/home/Home";
import {NavMenu} from "../../features/nav/NavMenu";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register"; 

class App extends Component {
    render() {
        return (
            <Fragment>
                <Switch>
                    <Route exact path='/' component={Home}/>
                </Switch>
                <Route path='/(.+)' render={() => (
                    <Fragment>
                        <NavMenu/>
                        <Container className="main">
                            <Route path='/home' component={Home}/>
                            <Route path='/counter' component={Counter}/>
                            <Route path='/fetchdata' component={FetchData}/>
                            <Route path='/login' component={Login}/>
                            <Route path='/register' component={Register}/>
                        </Container>
                    </Fragment>
                )}/>
            </Fragment>
        );
    }
}

export default App;

