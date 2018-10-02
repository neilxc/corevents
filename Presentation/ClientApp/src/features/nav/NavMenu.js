﻿import React, { Component } from 'react';
import {Button, Container, Menu} from "semantic-ui-react";
import {NavLink} from "react-router-dom";

export class NavMenu extends Component {

  render() {
    return (
        <Menu inverted fixed="top">
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo"/>
                    Re-vents
                </Menu.Item>
                <Menu.Item as={NavLink} to={'/home'} name="Home"/>
                <Menu.Item as={NavLink} to={'/counter'} name="Counter"/>
                <Menu.Item as={NavLink} to={'/fetchdata'} name="Fetch Data"/>
                <Menu.Item>
                    <Button floated="right" positive inverted content="Create Event"/>
                </Menu.Item>
                <Menu.Item position="right">
                    <Button basic inverted content="Login"/>
                    <Button basic inverted content="Sign Out" style={{marginLeft: '0.5em'}}/>
                </Menu.Item>
            </Container>
        </Menu>
    );
  }
}