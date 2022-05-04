import './App.scss';
import Deck from './components/Deck';

function App() {
  return (
    <div className="bg-dark-gray w-100 vh-100 flex justify-center items-center pt7">
      <Deck deckSize={10} />
    </div>
  );
}

export default App;
