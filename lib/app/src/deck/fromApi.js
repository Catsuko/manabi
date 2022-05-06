import React, { Component } from 'react';

const fromApi = (WrappedComponent) => class extends Component {
  state = {
    size: 0
  }

  add = (new_topics) => {
  }

  take = (callback) => {
  }

  componentDidMount () {
    fetch('http://localhost:4567/decks/test/topics?number=1', { method: 'HEAD' })
      .then((response) => {
        this.setState({ size: response.headers.get('X-Total-Count') })
      })
  }

  render () { 
    const { size } = this.state
    return <WrappedComponent
      deck={{ size: size, add: this.add, take: this.take }}
    />
  }
}

export default fromApi;
