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
    playCard.push({
      image: cards[Math.floor(Math.random() * cards.length)],
      isHover: false, 
      isOn: false,
      isSelected: false
    });
  }
  return playCard;
}

const getDifficulty = (index) => {
  return generatePlayCard(difficultyMaxImages(index), difficultyMaxCards(index))
}

function App() {
  const [difficulty, setDifficulty] = useState(0);
  const [playCards, setPlayCards] = useState(getDifficulty(difficulty));
  const hoverCard = (index) => {
    const playCard = playCards.map((r, i) =>{
      if (i === index)  {
        r.isHover = !r.isHover
        return r;
      } else {
        return r;
      }
    });
    setPlayCards(playCard)
  }

  const selectCard = (index) => {
    const playCard = playCards.map((r, i) =>{
      if (i === index)  {
        r.isSelected = !r.isSelected;
        return r;
      } else {
        return r;
      }
    });
    setPlayCards(playCard)
  }




  console.log(playCards);

  return (
    <div className="App">
      <div className="card-container">
        {playCards.map((card, i) =>
        <Card key={`cards[${i}]`} onClick={() => selectCard(i)} image={card.image} isSelected={card.isSelected} isOn={card.isOn} isHover={card.isHover} onMouseEnter={() => hoverCard(i)} onMouseLeave={() => hoverCard(i)}/>)}
      </div>
    </div>
  );
}

export default App;
