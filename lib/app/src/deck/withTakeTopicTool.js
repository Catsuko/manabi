import React, { Component, Fragment } from 'react';

import takeIcon from '../images/icon-take.svg';
import Button from '../generic/Button';

const withTakeTopicTool = (WrappedComponent) => class extends Component {

  render () {
    const { take, size } = this.props.deck
    const isEmpty = size < 1
    const takeTopic = isEmpty ? null : take
    return (
      <WrappedComponent {...this.props} takeTopic={takeTopic}>
        <Fragment>
          <Button description='Take a topic' onClick={takeTopic} icon={takeIcon} disabled={isEmpty} />
          {this.props.children}
        </Fragment>
      </WrappedComponent>
    )
  }
}

export default withTakeTopicTool;
