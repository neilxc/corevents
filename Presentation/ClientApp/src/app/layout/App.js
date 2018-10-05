import React, {Component, Fragment} from 'react';
import {Container} from "semantic-ui-react";
import {Route, Switch, withRouter} from "react-router-dom";
import {Counter} from "../../features/counter/Counter";
import {FetchData} from "../../features/fetchdata/FetchData";
import {Home} from "../../features/home/Home";
import {NavMenu} from "../../features/nav/NavMenu";
import Login from "../../features/auth/Login";
import Register from "../../features/auth/Register";
import {inject, observer} from "mobx-react";
import EventDashboard from "../../features/event/EventDashboard/EventDashboard";
import EventDetailedPage from "../../features/event/EventDetailed/EventDetailedPage";
import EventForm from "../../features/event/EventForm/EventForm";

@withRouter
@inject('commonStore', 'userStore')
@observer    
class App extends Component {
    componentWillMount() {
        if (!this.props.commonStore.token) {
            this.props.commonStore.setAppLoaded();
        }
    }
    
    componentDidMount() {
        if (this.props.commonStore.token) {
            this.props.userStore.pullUser().finally(() => this.props.commonStore.setAppLoaded());
        }
    }
    
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
                            <Route path='/events' component={EventDashboard}/>
                            <Route path='/event/:id' component={EventDetailedPage}/>
                            <Route path='/manage/:id' component={EventForm}/>
                            <Route path='/createEvent' component={EventForm}/>
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

