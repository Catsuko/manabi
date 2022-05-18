import { Fragment } from 'react';
import cn from 'classnames';

import './Deck.scss';
import withAddTopicTool from './withAddTopicTool';
import withTakeTopicTool from './withTakeTopicTool';
import fromApi from './fromApi';

function Deck({ deck, addTopic, takeTopic, children }) {
  const { size } = deck
  const cards = []
  const isEmpty = size < 1

  for(let i=Math.min(10, Math.max(0, size)); i--;) {
    cards.push(
      <div key={i} className='w5 h5 br4 ba bw3 blue absolute' onClick={takeTopic} />
    )
  }

  return (
    <Fragment>
      <div className='mr3 w2' />
      <div
        className={cn(
          'deck w5 h5 moon-gray bg-transparent br4 ba b--dashed bw2 relative',
          { 'pointer dim': isEmpty }
        )}
        onClick={isEmpty ? addTopic : null}
      >
        {cards}
      </div>
      <div className='flex flex-column items-start ml3'>
        {children}
      </div>
    </Fragment>
  )
}

export default fromApi(
  withTakeTopicTool(
    withAddTopicTool(
      Deck
    )
  )
);
