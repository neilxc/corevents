import React, {Component} from 'react';
import {inject, observer} from "mobx-react";
import {Grid} from "semantic-ui-react";
import EventList from "../EventList/EventList";
import LoadingComponent from "../../../app/layout/LoadingComponent";

@inject('eventStore', 'userStore')
@observer    
class EventDashboard extends Component {
    async componentDidMount() {
        await this.props.eventStore.getEvents();
    }
    
    render() {
        const {events, isLoading} = this.props.eventStore;
        if (isLoading) return <LoadingComponent inverted={true}/>;
        
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventList events={events} isLoading={isLoading}/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventDashboard;