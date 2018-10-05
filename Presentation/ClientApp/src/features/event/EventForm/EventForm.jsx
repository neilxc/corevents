import React, {Component} from 'react';
import {Button, Grid, Header, Input, Label, Segment} from "semantic-ui-react";
import {Form, TextArea} from "formsy-semantic-ui-react";
import {inject, observer} from "mobx-react";

@inject('eventStore', 'userStore') @observer
class EventForm extends Component {

    handleSubmit = (values) => {
        // const evt = {...values};
        // evt.host = this.props.userStore.currentUser;
        // console.log(evt);
        this.props.eventStore.createEvent(values);
        this.props.history.push('/events');
    };
    
    render() {
        const errorLabel = <Label color={'red'} pointing/>;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color={'teal'} content={'Event Details'}/>
                        <Form onValidSubmit={this.handleSubmit}>
                            <Form.Input
                                name={'title'}
                                placeholder={'Give your event a name'}
                                validations={'isWords'}
                                inputAs={Input}
                                required
                                validationErrors={{
                                    isDefaultRequiredValue: 'Title is required',
                                }}
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'category'}
                                placeholder={'What is your event about'}
                                // required
                                inputAs={Input}
                                validationErrors={{
                                    isDefaultRequiredValue: 'Category is required',
                                }}
                                errorLabel={errorLabel}
                            />
                            <TextArea
                                name={'description'}
                                placeholder={'Tell us about your event'}
                                // required
                                inputAs={Input}
                                validationErrors={{
                                    isDefaultRequiredValue: 'Description is required',
                                }}
                                errorLabel={errorLabel}
                            />
                            <Header sub color="teal" content="Event Location details" />
                            <Form.Input
                                name={'city'}
                                placeholder={'Event City'}
                                // required
                                inputAs={Input}
                                validationErrors={{
                                    isDefaultRequiredValue: 'City is required',
                                }}
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'venue'}
                                placeholder={'Event Venue'}
                                // required
                                inputAs={Input}
                                validationErrors={{
                                    isDefaultRequiredValue: 'Venue is required',
                                }}
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'date'}
                                placeholder={'Date and time of event'}
                                // required
                                inputAs={Input}
                                validationErrors={{
                                    isDefaultRequiredValue: 'Date is required',
                                }}
                                errorLabel={errorLabel}
                            />
                            <Button positive type={'submit'} content={'Submit'}/>
                            <Button content={'Cancel'}/>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>
        );
    }
}

export default EventForm;