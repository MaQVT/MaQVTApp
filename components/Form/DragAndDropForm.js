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
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="my-2 p-4 text-center space-x-2 rounded-xl bg-gray-200 p-2">
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
    <div className="h-full bg-rose_pr flex flex-col" >
      {/* <h2 className="w-full font-bold text-6xl">La vie au travail et moi</h2> */}
      <div className="flex flex-col justify-center items-center flex-1">
      <h1 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray">Quel est le rôle du travail pour moi de manière générale?</h1>
      <div className="p-4 rounded-lg">
      <p className="font-thin text-xs text-center mb-5">CLASSER LES 5 ITEMS PAR ORDRE DE PRIORITÉ (1 = MAXI / 5 = MINI)</p>
        <DndProvider backend={HTML5Backend}>
          <ItemList items={items} setItems={setItems} />
        </DndProvider>
      </div>
      </div>
      <div className='absolute bottom-[30px] flex flex-row justify-center items-center w-full'>
          {(position > 0 || position == -1) && (
            <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
              Précédant
            </button>
          )}
          <button onClick={handleNextClick} className="w-[100px] h-[50px] rounded mx-40" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
      </div>
    </div>
  );
};


export default DragAndDropForm;
