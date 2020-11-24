import Card from './component/Card'
import React, {useState} from 'react'
import './App.css';

const images = [
  'https://i2.wp.com/ceklog.kindel.com/wp-content/uploads/2013/02/firefox_2018-07-10_07-50-11.png',
  'https://i5.walmartimages.com/asr/209bb8a0-30ab-46be-b38d-58c2feb93e4a_1.1a15fb5bcbecbadd4a45822a11bf6257.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff',
  'https://i.pinimg.com/originals/10/d0/2d/10d02d5334e9a4af197e0709ad306d33.png',
  'https://www.pngonly.com/wp-content/uploads/2017/05/Grape-PNG-File.png'
]

const difficultyMaxImages = (index) => {
  return index + 2;
}

const difficultyMaxCards = (index) => {
  return (index + 1) * 8
}

const generatePlayCard = (maxImage, maxCards) => {
  const cards = images.splice(0, maxImage);
  const playCard = []
  for (let i = 0; i < maxCards; i++) {
    playCard.push(cards[Math.floor(Math.random() * cards.length)]);
  }
  return playCard;
}

const getDifficulty = (index) => {
  return {
    cards: generatePlayCard(difficultyMaxImages(index), difficultyMaxCards(index))
  }
}

function App() {
  const [difficulty, setDifficulty] = useState(0);
  return (
    <div className="App">
      <div className="card-container">
        {getDifficulty(difficulty).cards.map(image =>
        <Card image={image} />)}
      </div>
    </div>
  );
}

export default App;
