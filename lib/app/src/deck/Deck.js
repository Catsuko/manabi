import { Fragment } from 'react';
import cn from 'classnames';

import './Deck.scss';
import Button from './Button';
import fromLocal from './FromLocal';
import addIcon from '../images/icon-add.svg';
import takeIcon from '../images/icon-take.svg';

function Deck({ size, add, take }) {
  const cards = []
  const isEmpty = size < 1
  for(let i=Math.min(10, Math.max(0, size)); i--;) {
    cards.push(
      <div key={i} className='w5 h5 br4 ba bw3 blue absolute' onClick={i < 1 ? take : null} />
    )
  }
  return(
    <Fragment>
      <div className='mr3 w2' />
      <div
        className={cn(
          'deck w5 h5 moon-gray bg-transparent br4 ba b--dashed bw2 relative',
          { 'pointer dim': isEmpty }
        )}
        onClick={isEmpty ? add : null}
      >
        {cards}
      </div>
      <div className='flex flex-column items-start ml3'>
        <Button description='Add a Topic' onClick={add} icon={addIcon} />
        <Button description='Take a Topic' onClick={take} icon={takeIcon} disabled={isEmpty} />
      </div>
    </Fragment>
  )
}

export default fromLocal(Deck);
