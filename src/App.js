return (
  <div className="memory-game">
    <h1>Welcome to the GDG Workshop!</h1>
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
