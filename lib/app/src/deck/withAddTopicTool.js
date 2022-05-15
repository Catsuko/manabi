import React, { Component, Fragment } from 'react';

import addIcon from '../images/icon-add.svg';
import Button from '../generic/Button';
import withScreen from '../generic/withScreen';
import FrontsideCard from './FrontsideCard';
import AddTopicForm from './AddTopicForm';

const addTopicTool = (WrappedComponent) => class extends Component {
  render () {
    const { show, hide } = this.props.screen
    const add = (topics) => {
      hide();
      this.props.deck.add(topics)
    }
    const addTopic = () => show(
      <FrontsideCard>
        <AddTopicForm onSubmit={add} />
      </FrontsideCard>
    )
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

const toolWithModal = (WrappedComponent) => withScreen(addTopicTool(WrappedComponent))
export default toolWithModal;
