import React, { Component, Fragment } from 'react';

import addIcon from '../images/icon-add.svg';
import Button from '../generic/Button';

const withAddTopicTool = (WrappedComponent) => class extends Component {

  render () {
    const { add } = this.props.deck
    return (
      <WrappedComponent {...this.props} addTopic={add}>
        <Fragment>
          <Button description='Add a topic' onClick={add} icon={addIcon} />
          {this.props.children}
        </Fragment>
      </WrappedComponent>
    )
  }
}

export default withAddTopicTool;
