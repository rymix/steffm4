import {
  StyledAnimationItem,
  StyledButtons,
  StyledCovers,
  StyledMotion,
} from "components/Motion/StyledMotion";
import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";

export const Motion: React.FC = () => {
  const [startItem, setStartItem] = useState(0);

  const albumCovers = [
    { id: 0, component: <div>Album 1</div> },
    { id: 1, component: <div>Album 2</div> },
    { id: 2, component: <div>Album 3</div> },
    { id: 3, component: <div>Album 4</div> },
    { id: 4, component: <div>Album 5</div> },
    { id: 5, component: <div>Album 6</div> },
    { id: 6, component: <div>Album 7</div> },
    { id: 7, component: <div>Album 8</div> },
    { id: 8, component: <div>Album 9</div> },
  ];

  const handleClick = () => {
    setStartItem((startItem + 1) % albumCovers.length);
  };

  const renderCovers = () => {
    const previousIndex = startItem - 1;
    const currentIndex = startItem;
    const nextIndex = startItem + 1;
    const dummyPreviousItem = {
      id: "dummyPreviousItem",
      component: <p>DUMMY PREVIOUS ITEM</p>,
    };
    const dummyNextItem = {
      id: "dummyNextItem",
      component: <p>DUMMY NEXT ITEM</p>,
    };

    return (
      <>
        <AnimatePresence initial={false}>
          <StyledAnimationItem
            key={
              previousIndex <= -1
                ? dummyPreviousItem.id
                : albumCovers[previousIndex].id
            }
            initial={{ opacity: 0, x: 0, scale: 0.4 }}
            animate={{ opacity: 0.6, x: -200, scale: 0.6 }}
            exit={{ opacity: 0, x: -400, scale: 0.4 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute" }}
          >
            {previousIndex <= -1
              ? dummyPreviousItem.component
              : albumCovers[previousIndex].component}
          </StyledAnimationItem>
          <StyledAnimationItem
            key={albumCovers[currentIndex].id}
            initial={{ opacity: 0, x: 200, scale: 0.4 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -200, scale: 0.4 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute" }}
          >
            {albumCovers[currentIndex].component}
          </StyledAnimationItem>
          <StyledAnimationItem
            key={
              nextIndex >= albumCovers.length
                ? dummyNextItem.id
                : albumCovers[nextIndex].id
            }
            initial={{ opacity: 0, x: 400, scale: 0.4 }}
            animate={{ opacity: 0.6, x: 200, scale: 0.6 }}
            exit={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1 }}
            style={{ position: "absolute" }}
          >
            {nextIndex >= albumCovers.length
              ? dummyNextItem.component
              : albumCovers[nextIndex].component}
          </StyledAnimationItem>
        </AnimatePresence>
      </>
    );
  };

  return (
    <StyledMotion>
      <StyledButtons>
        <button type="button" onClick={handleClick}>
          Next Album
        </button>
      </StyledButtons>
      <StyledCovers>
        <AnimatePresence initial={false}>{renderCovers()}</AnimatePresence>
      </StyledCovers>
    </StyledMotion>
  );
};

export default Motion;
