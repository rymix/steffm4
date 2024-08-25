import { useEffect, useState } from "react";
import { BottomPanel, ScrollContainer, TopPanel } from "./Styled";

const Jupiter = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (event.deltaY > 0 && !isAtBottom) {
        // Scroll down to bottom panel
        setIsAtBottom(true);
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (event.deltaY < 0 && isAtBottom) {
        // Scroll up to top panel
        setIsAtBottom(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      touchStartY = event.touches[0].clientY;
    };
    const handleTouchMove = (event: TouchEvent) => {
      const touchEndY = event.touches[0].clientY;
      const swipeDistance = touchStartY - touchEndY;
      const sensitivity = 30; // Reduce this value to increase sensitivity

      if (swipeDistance > sensitivity && !isAtBottom) {
        // Scroll down to bottom panel
        setIsAtBottom(true);
        window.scrollTo({
          top: window.innerHeight,
          behavior: "smooth",
        });
      } else if (swipeDistance < -sensitivity && isAtBottom) {
        // Scroll up to top panel
        setIsAtBottom(false);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    let touchStartY = 0;

    window.addEventListener("wheel", handleScroll);
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);

    return () => {
      window.removeEventListener("wheel", handleScroll);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isAtBottom]);

  return (
    <ScrollContainer>
      <TopPanel>
        <h1>Top Panel</h1>
        <p>Your content here</p>
        {/* Add your top panel content */}
      </TopPanel>
      <BottomPanel>
        <h1>Bottom Panel</h1>
        <p>Your content here</p>
        {/* Add your bottom panel content */}
      </BottomPanel>
    </ScrollContainer>
  );
};

export default Jupiter;
