import React, { Component, Fragment } from 'react';
import './Screen.scss';

const withScreen = (WrappedComponent) => class extends Component {
  state = {
    element: null
  }

  show = (element) => this.setState({ element: element })
  hide = () => this.setState({ element: null })
  swallowClick = (e) => e.stopPropagation()

  render () {
    const { element } = this.state
    return (
      <Fragment>
      {!!element && <div className='absolute absolute--fill bg-transparent-black z-999 flex items-center justify-center' onClick={this.hide}>
        <div className='w-100 mw7 flex justify-end items-center relative ml3'>
          <div onClick={this.swallowClick}>
            {element}
          </div>
        </div>
      </div>}
        <WrappedComponent {...this.props} screen={{ show: this.show, hide: this.hide }} />
      </Fragment>
    )
  }
}

export default withScreen;