import { StyledBurger } from "components/BurgerMenu/StyledBurgerMenu";
import { useSession } from "contexts/session";

const Burger: React.FC = () => {
  const { menuOpen, setMenuOpen } = useSession();

  return (
    <StyledBurger $open={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
