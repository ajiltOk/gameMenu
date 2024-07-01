import styles from "./Karman.module.scss";
import DraggableElement from "../Item/Item";
import { useState, memo, useCallback, useEffect } from "react";
import { useDrop } from "react-dnd";
import update from "immutability-helper";

const Karman = memo(function Karman({ draggedToKarman }) {
  const [cards, setCards] = useState(draggedToKarman);

  useEffect(() => {
    setCards(draggedToKarman);
  }, [draggedToKarman]);

  const findCard = useCallback(
    (id) => {
      const card = cards.filter((c) => `${c.id}` === id)[0];
      return {
        card,
        index: cards.indexOf(card),
      };
    },
    [cards]
  );

  const moveCard = useCallback(
    (id, atIndex) => {
      const { card, index } = findCard(id);
      setCards(
        update(cards, {
          $splice: [
            [index, 1],
            [atIndex, 0, card],
          ],
        })
      );
    },
    [findCard, cards, setCards]
  );

  const [, drop] = useDrop(() => ({ accept: "ELEMENT" }));

  return (
    <>
      <p>Карман</p>
      <div ref={drop} className={styles.container}>
        {cards.map((card) => (
          <DraggableElement
            itemName={card.name}
            key={card.id}
            id={`${card.id}`}
            moveCard={moveCard}
            findCard={findCard}
            element={card}
          />
        ))}
      </div>
    </>
  );
});

export default Karman;
