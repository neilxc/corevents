import React, { Component } from 'react';
import { Form, Label } from 'semantic-ui-react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { withFormsy } from 'formsy-react';
import {inject} from "mobx-react";

@withFormsy
@inject('eventStore')    
class DateInput extends Component {
    state = {
        selectedDate: null
    };

    handleDateChange = (evt) => {
        console.log(evt);
        this.setState({
            selectedDate: moment(evt)
        });
        this.props.setValue(moment(evt).format('DD MMM YYYY h:mm a'))
    };
    

    render() {
        const {width, ...rest } = this.props;
        return (
            <Form.Field width={6}>
                <DatePicker
                    {...rest}
                    selected={this.state.selectedDate}
                    onChange={this.handleDateChange}
                    value={this.props.getValue() || null}
                />
                { /*{touched && error && <Label basic color='red'>{error}</Label>}*/
                }
            </Form.Field>
        );
    }
}

export default DateInput