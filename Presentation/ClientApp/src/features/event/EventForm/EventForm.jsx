import React, {Component} from 'react';
import {Button, Grid, Header, Input, Label, Segment} from "semantic-ui-react";
import {Form, TextArea} from "formsy-semantic-ui-react";
import {inject, observer} from "mobx-react";
import {withRouter} from "react-router-dom";
import 'react-datepicker/dist/react-datepicker.css';
import DateInput from "../../../app/form/DateInput";

@withRouter
@inject('eventStore', 'userStore') @observer
class EventForm extends Component {

    async componentDidMount() {
        const id = +this.props.match.params.id;
        if (id) {
            await this.props.eventStore.loadEvent(id);
            this.populateForm();
        }
    }

    handleSubmit = async (event) => {
        const id = +this.props.match.params.id;
        try {
            if (id) {
                event.id = id;
                await this.props.eventStore.updateEvent(event);
            } else {
                await this.props.eventStore.createEvent(event);
            }
            this.props.history.push('/events');
        } catch (e) {
            console.log(e);
        }
    };
    
    populateForm = () => {
        const event = this.props.eventStore.getEvent(+this.props.match.params.id);
        this.refs.form.reset(event);
    };
    
    render() {
        const errorLabel = <Label color={'red'} pointing/>;
        return (
            <Grid>
                <Grid.Column width={10}>
                    <Segment>
                        <Header sub color={'teal'} content={'Event Details'}/>
                        <Form ref="form" onValidSubmit={this.handleSubmit} autoComplete='off'>
                            <Form.Input
                                name={'title'}
                                placeholder={'Give your event a name'}
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
                            <DateInput
                                name={'date'}
                                placeholderText={'Date and time of event'}
                                showTimeSelect
                                dateFormat="YYYY-MM-DD HH:mm"
                                timeFormat="HH:mm"
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