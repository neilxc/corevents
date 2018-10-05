import React, {Component} from 'react';
import {Grid} from "semantic-ui-react";
import EventDetailedHeader from "./EventDetailedHeader";
import EventDetailedInfo from "./EventDetailedInfo";
import EventDetailedChat from "./EventDetailedChat";
import EventDetailedSidebar from "./EventDetailedSidebar";
import {inject, observer} from "mobx-react";
import LoadingComponent from "../../../app/layout/LoadingComponent";

@inject('eventStore') @observer    
class EventDetailedPage extends Component {
    
    async componentDidMount() {
        const id = this.props.match.params.id;
        await this.props.eventStore.getEvent(id);
    }
    
    render() {
        const {event, isLoadingDetail} = this.props.eventStore;
        if (isLoadingDetail) return <LoadingComponent inverted={true}/>;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <EventDetailedHeader event={event}/>
                    <EventDetailedInfo event={event}/>
                    <EventDetailedChat/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <EventDetailedSidebar attendees={event.attendees}/>
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventDetailedPage;