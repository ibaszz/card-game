import Card from './component/Card'
import React, {useState, useRef} from 'react'
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

const getPlayedImages = (difficult) => {
  const maxImage = difficultyMaxImages(difficult);
  const playedImages = images.splice(0, maxImage);
  return playedImages;
}

const generatePlayCard = (cards, maxCards) => {
  const playCard = [];
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

const getDifficulty = (index, playedImages) => {
  return generatePlayCard(playedImages, difficultyMaxCards(index))
}

const shuffleCard = (playCard) => {
  playCard = playCard.map(r => ({...r, isOn: false}));
  let mustBeOpenedCard = playCard.length / 2;
  while(playCard.filter(r => r.isOn).length !== mustBeOpenedCard) {
    const random = Math.floor(Math.random() * playCard.length);
    playCard[random].isOn = true;
  };
  return playCard;
}

function App() {
  const [difficulty, setDifficulty] = useState(0);
  const [playedImages, setPlayedImages] = useState(getPlayedImages(difficulty));
  const [playCards, setPlayCards] = useState(getDifficulty(difficulty, playedImages));
  const [guessCard, setGuessCard] = useState()
  const [playable, setPlayable] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const interval = useRef(null);

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

  const onStart = () => {
    let count = countdown
    interval.current = setInterval(() => {
      count--;
      setCountdown(count);
      setPlayCards(shuffleCard(playCards));
      if (count <= 0){
        setPlayable(true);
        setPlayCards(playCards.map(r => ({...r, isOn: false})))
        setGuessCard(playedImages[Math.floor(Math.random() * playedImages.length)])
        clearInterval(interval.current);
      }
    }, 1000)
  }

  const action = playable ? (i) => ({
    onClick: () => selectCard(i),
    onMouseEnter: () => hoverCard(i),
    onMouseLeave: () => hoverCard(i)
  }) : (i) => null;

  return (
    <div className="App">
      <div>Guess Card </div>
      <div><Card image={guessCard} isOn={guessCard}></Card></div>
      <div className="card-container">
        {playCards.map((card, i) =>
        <Card key={`cards[${i}]`} {...action(i)} image={card.image} isSelected={card.isSelected} isOn={card.isOn} isHover={card.isHover} />)}
      </div>
      <button onClick={onStart}> Start </button>
    </div>
  );
}

export default App;
