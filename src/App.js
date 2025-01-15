import React, { useState, useEffect } from 'react';
import './App.css';

const cardValues = ['🍎', '🍌', '🍓', '🍇', '🍊', '🍉'];

const App = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Initialize shuffled cards when component loads
  useEffect(() => {
    const shuffledCards = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map((value) => ({ value, isFlipped: false, isMatched: false }));
    setCards(shuffledCards);
  }, []);

  //Integrating UTM parameters
  useEffect(() => {
    const getUTMParameters = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const utmParams = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        utm_term: urlParams.get('utm_term'),
        utm_content: urlParams.get('utm_content'),
      };
      console.log("UTM Parameters:", utmParams);
    };

  const handleCardClick = (index) => {
    // Skip if card is flipped or matched, or if two cards are already flipped
    if (cards[index].isFlipped || cards[index].isMatched || flippedCards.length === 2) return;

    const updatedCards = [...cards];
    updatedCards[index].isFlipped = true;
    setCards(updatedCards);

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setAttempts(attempts + 1);
      setTimeout(() => checkMatch(newFlippedCards), 800);
    }
  };

  const checkMatch = ([firstIndex, secondIndex]) => {
    const updatedCards = [...cards];
    if (cards[firstIndex].value === cards[secondIndex].value) {
      updatedCards[firstIndex].isMatched = true;
      updatedCards[secondIndex].isMatched = true;
    } else {
      updatedCards[firstIndex].isFlipped = false;
      updatedCards[secondIndex].isFlipped = false;
    }
    setCards(updatedCards);
    setFlippedCards([]);
  };

  return (
    <div className="memory-game">
      <h1>Welcome to the Workshop Project!</h1>
      <h2>Memory Card Game</h2>
      <p>Attempts: {attempts}</p>
      <div className="card-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${card.isFlipped || card.isMatched ? 'flipped' : ''}`}
            onClick={() => handleCardClick(index)}
          >
            <div className="card-front">{card.value}</div>
            <div className="card-back">?</div>
          </div>
        ))}
      </div>
      {cards.every(card => card.isMatched) && (
        <h2>Congratulations! You've matched all cards in {attempts} attempts!</h2>
      )}
    </div>
  );  
};

export default App;
