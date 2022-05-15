import React, { Component, Fragment } from 'react';

import takeIcon from '../images/icon-take.svg';
import Button from '../generic/Button';
import FrontsideCard from './FrontsideCard';
import withScreen from '../generic/withScreen';

const takeTopicTool = (WrappedComponent) => class extends Component {

  render () {
    const { take, size } = this.props.deck
    const { show } = this.props.screen
    const isEmpty = size < 1
    const showTopic = (topic) => show(<FrontsideCard>
      <div className='w-100 h-100 flex items-center justify-center'>
        <h2>{topic}</h2>
      </div>
    </FrontsideCard>)
    const takeTopic = isEmpty ? null : () => take(showTopic)

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

const toolWithModal = (WrappedComponent) => withScreen(takeTopicTool(WrappedComponent))
export default toolWithModal;
