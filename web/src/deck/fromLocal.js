import React, { Component } from 'react';

const fromLocal = (WrappedComponent, topics = []) => class extends Component {
  state = {
    topics: topics
  }

  add = (new_topics) => {
    this.setState((prevState) => ({ topics: prevState.topics.concat(new_topics) }))
  }

  take = (callback) => {
    const topic = this.state.topics[0]
    this.setState(
      (prevState) => ({ topics: prevState.topics.slice(1) }),
      () => callback(topic)
    )
  }

  render () {
    const { topics } = this.state
    const size = topics.length
    return <WrappedComponent
      deck={{ size: size, add: this.add, take: size > 0 ? this.take : null }}
    />
  }
}

export default fromLocal;
