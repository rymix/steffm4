import { StyledMenu } from "components/BurgerMenu/StyledBurgerMenu";
import { useSession } from "contexts/session";

const Menu: React.FC = () => {
  const { menuOpen } = useSession();

  return (
    <StyledMenu $open={menuOpen}>
      <a href="/">About us</a>
      <a href="/">Pricing</a>
      <a href="/">Contact</a>
    </StyledMenu>
  );
};

export default Menu;
