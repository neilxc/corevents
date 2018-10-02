import React, { Component } from 'react';
import {Table} from "semantic-ui-react";

export class FetchData extends Component {
  displayName = FetchData.name

  constructor(props) {
    super(props);
    this.state = { forecasts: [], loading: true };

    fetch('api/SampleData/WeatherForecasts')
      .then(response => response.json())
      .then(data => {
        this.setState({ forecasts: data, loading: false });
      });
  }

  static renderForecastsTable(forecasts) {
    return (
      <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell>Temp. (C)</Table.HeaderCell>
            <Table.HeaderCell>Temp. (F)</Table.HeaderCell>
            <Table.HeaderCell>Summary</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {forecasts.map(forecast =>
            <Table.Row key={forecast.dateFormatted}>
              <Table.Cell>{forecast.dateFormatted}</Table.Cell>
              <Table.Cell>{forecast.temperatureC}</Table.Cell>
              <Table.Cell>{forecast.temperatureF}</Table.Cell>
              <Table.Cell>{forecast.summary}</Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : FetchData.renderForecastsTable(this.state.forecasts);

    return (
      <div>
        <h1>Weather forecast</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
      </div>
    );
  }
}
