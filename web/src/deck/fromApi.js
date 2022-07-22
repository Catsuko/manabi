import React, { Component } from 'react';

// TODO: use different endpoint for different environment
// TODO: load deck name from route
// TODO: disable click while a request is happening
// TODO: reduce lag!
const TOPIC_RESOURCE = `http://localhost:4567/decks/test/topics`

const fromApi = (WrappedComponent) => class extends Component {
  state = {
    size: 0
  }

  handleRequest = (request, callback = () => {}) => {
    request.then((response) => {
      this.setState(
        { size: response.headers.get('X-Total-Count') },
        () => callback(response)
      )
    })
  }

  add = (new_topics) => {
    this.handleRequest(fetch(TOPIC_RESOURCE, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topics: new_topics })
    }))
  }

  take = (callback) => {
    this.handleRequest(fetch(TOPIC_RESOURCE, {
      method: 'DELETE'
    }), (response) => response.json().then(callback))
  }

  componentDidMount = () => {
    this.handleRequest(fetch(TOPIC_RESOURCE, { method: 'HEAD' }))
  }

  render () { 
    const { size } = this.state
    return <WrappedComponent
      deck={{ size: size, add: this.add, take: this.take }}
    />
  }
}

export default fromApi;
