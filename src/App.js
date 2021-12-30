import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./Components/SingleCard";
const cardImages = [
  { src: "/img/helmet-1.png", matched: false },
  { src: "/img/potion-1.png", matched: false },
  { src: "/img/ring-1.png", matched: false },
  { src: "/img/scroll-1.png", matched: false },
  { src: "/img/shield-1.png", matched: false },
  { src: "/img/sword-1.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [count, setCount] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  // shuffle the cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    setCards(shuffleCards);
    setCount(0);
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  // Compares 2 selecetd cards
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    setCount(count + 1);
    // Note- we cannot comapre the card choices in this handle choice function which we are doing in the useEffect() block
    // bcoz  whenever we call setChoiceTwo() or setChoiceOne() the update of variables choiceOne or choiceTwo is scheduled
    // and donot get updated immediately that's why useEffect() used. If we compare them right here then we will be comparing there
    // previous values not the updated one . Bcoz updating values takes time in useState functions
  };

  useEffect(() => {

    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("cards matched");
        setCards(
          cards.map((card) => {
            if (card.src === choiceOne.src) {
              return { src: card.src, matched: true, id: card.id };
            } else {
              return card;
            }
          })
        );
        resetTurn();
      } else {
        console.log("not matched");
        setTimeout(() => resetTurn(), 500);
      }
    }
  }, [choiceOne, choiceTwo,cards]);


  //reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards.map((cards) => (
          <SingleCard
            card={cards}
            handleChoice={handleChoice}
            flipped={
              choiceOne === cards || choiceTwo === cards || cards.matched
            }
          />
        ))}
      </div>
      {count !== 0 ? <p>Number of Turns {count}</p> : ""}
    </div>
  );
}

export default App;
