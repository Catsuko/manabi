import React, { Component } from 'react';

const withScreen = (WrappedComponent) => class extends Component {
  state = {
    isActive: false
  }

  show = () => this.setState({ isActive: true })
  hide = () => this.setState({ isActive: false })

  render () {
    const { isActive } = this.state
    return (
      isActive && <div className='absolute absolute--fill bg-black'>
        <WrappedComponent {...this.props} screen={{ show: this.show, hide: this.hide }} />
      </div>
    )
  }
}

export default withScreen;