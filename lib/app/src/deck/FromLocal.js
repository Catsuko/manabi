import React, { Component } from 'react';

const fromLocal = (WrappedComponent) => class extends Component {
  state = {
    size: 0
  }

  add = (_topics) => this.setState((prevState) => ({ size: Math.min(prevState.size + 1, 10) }))
  take = () => this.setState((prevState) => ({ size: Math.max(prevState.size - 1, 0) }))

  render () {
    const { size } = this.state
    return <WrappedComponent
      deck={{ size: size, add: this.add, take: size > 0 ? this.take : null }}
    />
  }
}

export default fromLocal;
