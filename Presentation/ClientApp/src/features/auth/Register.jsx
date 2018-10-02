import React, {Component} from 'react';
import {Form} from "formsy-semantic-ui-react";
import {Button, Grid, Header, Label, Segment} from "semantic-ui-react";

class Register extends Component {
    handleSubmit = (values) => {
        console.log(values)
    };
    render() {
        const errorLabel = <Label color={'red'} pointing/>;
        return (
            <Grid centered>
                <Grid.Column width={6}>
                    <Header content={'Sign up to CoreVents'} textAlign={'center'} size={'large'}/>
                    <Form size={'large'} onValidSubmit={this.handleSubmit}>
                        <Segment>
                            <Form.Input
                                name={'firstName'}
                                label={'First Name'}
                                validations={'isWords'}
                                validationErrors={{
                                    isWords: 'You must enter a First Name',
                                }}
                                required
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'lastName'}
                                label={'Last Name'}
                                validations={'isWords'}
                                validationErrors={{
                                    isWords: 'You must enter a Last Name',
                                }}
                                required
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'email'}
                                label={'Email'}
                                validations={'isEmail'}
                                validationErrors={{
                                    isEmail: 'Email not valid',
                                    isDefaultRequiredValue: 'Email is required'
                                }}
                                required
                                errorLabel={errorLabel}
                            />
                            <Form.Input
                                name={'password'}
                                label={'Password'}
                                type={'password'}
                                required={true}
                                validationErrors={{isDefaultRequiredValue: 'Password is required'}}
                                errorLabel={errorLabel}
                            />
                            <Button fluid size="large" color="teal">
                                Register
                            </Button>
                        </Segment>
                    </Form>
                </Grid.Column>

            </Grid>

        );
    }
}

export default Register;