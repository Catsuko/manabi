import React, { Component, Fragment } from 'react';

const withScreen = (WrappedComponent) => class extends Component {
  state = {
    element: null
  }

  show = (element) => this.setState({ element: element })
  hide = () => this.setState({ element: null })

  render () {
    const { element } = this.state
    return (
      <Fragment>
      {!!element && <div className='absolute absolute--fill bg-transparent z-999 flex items-center justify-center' onClick={this.hide}>
        {element}
      </div>}
        <WrappedComponent {...this.props} screen={{ show: this.show, hide: this.hide }} />
      </Fragment>
    )
  }
}

export default withScreen;