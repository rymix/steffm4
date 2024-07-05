import Burger from "components/BurgerMenu/Burger";
import Menu from "components/BurgerMenu/Menu";
import { useMixcloud } from "contexts/mixcloud";
import React from "react";

export const BurgerMenu: React.FC = () => {
  const {
    session: { burgerMenuRef },
  } = useMixcloud();

  return (
    <div ref={burgerMenuRef}>
      <Burger />
      <Menu />
    </div>
  );
};

export default BurgerMenu;
