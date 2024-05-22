import { StyledMenu } from "components/BurgerMenu/StyledBurgerMenu";
import { useSession } from "contexts/session";

const Menu: React.FC = () => {
  const { menuOpen } = useSession();

  return (
    <StyledMenu $open={menuOpen}>
      <a href="/">Mix List</a>
      <a href="/">About Stef.FM</a>
      <a href="/">Settings</a>
    </StyledMenu>
  );
};

export default Menu;
