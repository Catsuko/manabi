import React, { Component, Fragment } from 'react';

import addIcon from '../images/icon-add.svg';
import Button from '../generic/Button';
import withScreen from '../generic/withScreen';

const addTopicTool = (WrappedComponent) => class extends Component {
  render () {
    const { show } = this.props.screen
    const addTopic = () => show(<div className='bg-near-black w5 h5 shadow-5'>Hello</div>)
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

const topicToolWithModal = (WrappedComponent) => withScreen(addTopicTool(WrappedComponent))
export default topicToolWithModal;
