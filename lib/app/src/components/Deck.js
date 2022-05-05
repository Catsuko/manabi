function Deck({ deckSize }) {
  const cards = []
  for(let i=Math.min(10, Math.max(0, deckSize)); i--;) {
    cards.push(<div key={i} className='w5 h5 br4 ba bw3 blue absolute' />)
  }
  return(
    <div className='deck w5 h5 moon-gray bg-transparent br4 ba b--dashed bw2 relative'>
      {cards}
    </div> 
  )
}

export default Deck;
