import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

const initialItems = [
  { id: "1", content: "Le travail me permet de gagner de l'argent" },
  { id: "2", content: "Le travail nourrit mes liens humains et ma vie sociale" },
  { id: "3", content: "Le travail me donne une identité au sein de la société" },
  { id: "4", content: "Le travail est l'occasion de m’accomplir personnellement" },
  { id: "5", content: "Le travail me permet de contribuer utilement à la société" },
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

const DragAndDropForm = ({ handlePrev, handleNext, stepName, position, titleName, pageNumber }) => {
  const [items, setItems] = useState(initialItems);
  const [order, setOrder] = useState([]);

  const getBackend = () => {
    const isTouchDevice = ("ontouchstart" in window || navigator.maxTouchPoints) && !window.matchMedia("(hover: hover)").matches;
    return isTouchDevice ? TouchBackend : HTML5Backend;
  };
  

  const handleNextClick = () => {
    const itemIds = items.map((item) => item.id);
    setOrder(itemIds);
    // console.log(itemIds);
    window.scrollTo(0, 0)
    handleNext({ [stepName]: itemIds })
  };


  return (
    <div className="h-full flex flex-col select-none" >
      {/* <h2 className="w-full font-bold text-6xl">La vie au travail et moi</h2> */}
      <div className="flex flex-col justify-center items-center flex-1">
        <h1 className="font-thin text-3xl my-6 mt-0 font-PlayfairDisplay text-customGray md:text-2xl md:mt-10 md:px-6 md:text-center">
          <span className="text-purple-800 font-Benedict mr-8 text-5xl">{pageNumber}</span>

          Quelle est la fonction du travail pour moi, de manière générale ?
        </h1>
        <div className="p-4 rounded-lg">
          <p className="font-thin text-xs text-center mb-5">CLASSER LES 5 FONCTIONS PAR ORDRE DE PRIORITÉ (1 = MAXI / 5 = MINI)</p>
          <div className="flex flex-row">
            <div className="flex flex-col justify-start">
                <span className="mt-2 mr-5 p-4 text-center space-x-2 rounded-xl bg-white sm:my-4">1</span>
                <span className="my-[6px] mr-5 p-4 text-center space-x-2 rounded-xl bg-white sm:my-4">2</span>
                <span className="my-1 mr-5 p-4 text-center space-x-2 rounded-xl bg-white sm:my-4">3</span>
                <span className="my-1 mr-5 p-4 text-center space-x-2 rounded-xl bg-white sm:my-4">4</span>
                <span className="my-1 mr-5 p-4 text-center space-x-2 rounded-xl bg-white sm:my-4">5</span>
            </div>
            <div>
              <DndProvider backend={getBackend()}>
                <ItemList items={items} setItems={setItems} />
              </DndProvider>
            </div>
          </div>
        </div>
      </div>
      <div className='absolute bottom-[110px] flex flex-row justify-center items-center w-full md:relative md:bottom-0 md:mb-10'>
        {(position > 0 || position == -1) && (
          <button type="button" onClick={handlePrev} className="w-[100px] h-[50px] rounded">
            Précédent
          </button>
        )}
        <button onClick={handleNextClick} className="w-[100px] h-[50px] rounded mx-40 sm:mx-5" type="submit">{position == -1 ? "Terminer" : "Suivant"}</button>
      </div>
    </div>
  );
};


export default DragAndDropForm;
