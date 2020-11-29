import Card from './component/Card'
import Button from './component/Button';
import Modal from './component/Modal';
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
  return (index + 1) * 10
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
      isSelected: false,
      shuffled: false
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
    playCard[random].shuffled = true;
  };
  return playCard;
}

function App() {
  const [difficulty, setDifficulty] = useState(0);
  const [playedImages, setPlayedImages] = useState(getPlayedImages(difficulty));
  const [playCards, setPlayCards] = useState(getDifficulty(difficulty, playedImages));
  const [guessCard, setGuessCard] = useState(null)
  const [playable, setPlayable] = useState(false);
  const [isShuffling, setIsShuffling] = useState(false);
  const [result, setResult] = useState(false);
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

  const submitGuess = () => {
    const guessedCard = playCards.filter(r => r.isSelected &&  r.image === guessCard).length;
    const correctCard = playCards.filter(r => r.image === guessCard).length;
    setPlayCards(playCards.map(r => {
      if (r.isSelected) {
        r.isOn = true;
      }
      return r;
    }))
    if (guessedCard === correctCard) {
      setResult("Selamat Anda Berhasil")
    } else {
      setResult("Maaf Anda Belum Berhasil")
    }
  }

  const selectCard = (index) => {
    const correctCard = playCards.filter(r => r.image === guessCard).length;
    const selectedCard = playCards.filter(r => r.isSelected).length;
    // check max choosen 
    if (!playCards[index].isSelected) {
      if (selectedCard < correctCard) {
        setPlayCards(playCards.map((r, i) =>{
          if (i === index)  {
            r.isSelected = !r.isSelected;
            return r;
          } else {
            return r;
          }
        }))
      }
    } else {
      setPlayCards(playCards.map((r, i) =>{
        if (i === index)  {
          r.isSelected = !r.isSelected;
          return r;
        } else {
          return r;
        }
      }))
    }
  }

  const onStart = () => {
    setIsShuffling(true);
    let playCard = playCards;
    interval.current = setInterval(() => {
      const shuffledCard = shuffleCard(playCards);
      playCard = playCard.map((r, i) => {
        if (!r.shuffled && shuffledCard[i].shuffled) {
          r.shuffled = true;
        }
        return r;
      })
      setPlayCards(shuffledCard);
      if (playCard.filter(r => !r.shuffled).length === 0){
        setPlayable(true);
        setTimeout(() => {
          setPlayCards(playCards.map(r => ({...r, isOn: false})))
          setIsShuffling(false);
          setGuessCard(playedImages[Math.floor(Math.random() * playedImages.length)])
        }, 1000);
        clearInterval(interval.current);
      }
    }, 1000);
  }

  const action = playable ? (i) => ({
    onClick: () => selectCard(i),
    onMouseEnter: () => hoverCard(i),
    onMouseLeave: () => hoverCard(i)
  }) : () => null;

  return (
    <div className="App">
      <div className="guess-card-text">Guess <span className="guess-card-border">C</span>ard </div>
      <div className="guess-card-container"><Card image={guessCard} isOn={guessCard !== null}></Card></div>
      <div className="card-container">
        {playCards.map((card, i) =>
        <Card key={`cards[${i}]`} {...action(i)} image={card.image} isSelected={card.isSelected} isOn={card.isOn} isHover={card.isHover} />)}
      </div>
      {playable ? <Button onClick={submitGuess}>Submit Guess</Button> : <Button onClick={!isShuffling ? onStart : null}> Start </Button> }
      <Modal result={result} onClose={() => {
        setResult(false);
        setGuessCard(null);
        setPlayCards(getDifficulty(difficulty, playedImages))
        setPlayable(false)
      }}/>
    </div>
  );
}

export default App;
