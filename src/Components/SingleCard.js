import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped }) {
  return (
    <div className="card" key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card back" />
        <img
          className="back"
          src="/img/cover.png"
          onClick={() => handleChoice(card)}
          alt="card front"
        />
      </div>
    </div>
  );
}

export default SingleCard;
