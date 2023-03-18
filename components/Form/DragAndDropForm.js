import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const initialItems = [
  { id: "1", content: "Le travail me permet de gagner de l'argent" },
  { id: "2", content: "Le travail nourrit mes liens humains et ma vie sociale" },
  { id: "3", content: "Le travail me donne une identité qui a de la valeur en société" },
  { id: "4", content: "Le travail est l'occasion de m’accomplir personnellement" },
  { id: "5", content: "Le travail est ma façon de contribuer à la Société" },
];

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const ItemList = ({ items, setItems }) => {
  const [draggingId, setDraggingId] = useState(null);

  const findCard = (id) => {
    const card = items.filter((c) => `${c.id}` === id)[0];
    return {
      card,
      index: items.indexOf(card),
    };
  };

  const moveCard = (id, toIndex) => {
    const { card, index } = findCard(id);
    setItems(reorder(items, index, toIndex));
  };

  return (
    <div>
      {items.map((item, index) => (
        <Draggable
          key={item.id}
          item={item}
          index={index}
          moveCard={moveCard}
          setDraggingId={setDraggingId}
        />
      ))}
    </div>
  );
};

const Draggable = ({ item, index, setDraggingId, moveCard }) => {
  const ref = React.useRef(null);

  const [{ isDragging }, drag] = useDrag({
    type: "card",
    item: { id: item.id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: () => setDraggingId(null),
  });

  const [, drop] = useDrop({
    accept: "card",
    hover: (item) => {
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveCard(item.id, hoverIndex);

      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="my-5 border-dashed border-2 border-black p-2">
      <span>{item.content}</span>
    </div>
  );
};

const DragAndDropForm = ({ handlePrev, handleNext, stepName, position, titleName }) => {
  const [items, setItems] = useState(initialItems);
  const [order, setOrder] = useState([]);

  const handleNextClick = () => {
    const itemIds = items.map((item) => item.id);
    setOrder(itemIds);
    console.log(itemIds);
    handleNext({ [stepName]: itemIds })
  };
  

  return (
    <>
      <h1>Quel est le rôle du travail pour moi de manière générale?</h1>
      <h2>CLASSER LES 5 ITEMS PAR ORDRE DE PRIORITÉ (1 = MAXI / 5 = MINI)</h2>
      <DndProvider backend={HTML5Backend}>
        <ItemList items={items} setItems={setItems} />
      </DndProvider>
      {(position > 0 || position == -1) && <button type="button" onClick={handlePrev}>Précédant</button>}
      <button onClick={handleNextClick}>{position == -1 ? "Terminer" : "Suivant"}</button>
    </>
  );
};


export default DragAndDropForm;
