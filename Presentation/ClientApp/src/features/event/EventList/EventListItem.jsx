import React, {Component} from 'react';
import {Button, Icon, Item, List, Segment} from "semantic-ui-react";
import EventListAttendee from "./EventListAttendee";
import {Link} from "react-router-dom";
import {observer} from "mobx-react";

@observer
class EventListItem extends Component {
    render() {
        const {event} = this.props;
        const {attendees} = event;
        return (
            <Segment.Group>
                <Segment>
                    <Item.Group>
                        <Item>
                            <Item.Image size="tiny" circular src={event.host.photoUrl}/>
                            <Item.Content>
                                <Item.Header as="a">{event.title}</Item.Header>
                                <Item.Description>
                                    Hosted by <a>{event.host.userName}</a>
                                </Item.Description>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
                <Segment>
                           <span>
                             <Icon name="clock"/> {event.date} |
                             <Icon name="marker"/> {event.venue}
                           </span>
                </Segment>
                <Segment secondary>
                    <List horizontal>
                        {attendees && attendees.map((attendee) => (
                            <EventListAttendee key={attendee.id} attendee={attendee}/>
                        ))}
                    </List>
                </Segment>
                <Segment clearing>
                    <span>{event.description}</span>
                    <Button as={Link} to={`/event/${event.id}`} color="teal" floated="right" content="View"/>
                </Segment>
            </Segment.Group>
        );
    }
}

export default EventListItem;