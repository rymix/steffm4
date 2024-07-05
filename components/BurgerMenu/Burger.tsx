import { StyledBurger } from "components/BurgerMenu/StyledBurgerMenu";
import { useMixcloud } from "contexts/mixcloud";

const Burger: React.FC = () => {
  const {
    session: { menuOpen, setMenuOpen },
  } = useMixcloud();

  return (
    <StyledBurger $open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
