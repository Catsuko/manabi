import React, { Component, Fragment } from 'react';

import addIcon from '../images/icon-add.svg';
import Button from '../generic/Button';

const withAddTopicTool = (WrappedComponent) => class extends Component {

  render () {
    const { add } = this.props.deck
    const addTopic = () => add(['test'])
    return (
      <WrappedComponent {...this.props} addTopic={addTopic}>
        <Fragment>
          <Button description='Add a topic' onClick={addTopic} icon={addIcon} />
          {this.props.children}
        </Fragment>
      </WrappedComponent>
    )
  }
}

export default withAddTopicTool;
