import { StyledMenu } from "components/BurgerMenu/StyledBurgerMenu";
import { useSession } from "contexts/session";

const Menu: React.FC = () => {
  const { menuOpen } = useSession();

  return (
    <StyledMenu $open={menuOpen}>
      <a href="/">
        <span role="img" aria-label="about us">
          💁🏻‍♂️
        </span>
        About us
      </a>
      <a href="/">
        <span role="img" aria-label="price">
          💸
        </span>
        Pricing
      </a>
      <a href="/">
        <span role="img" aria-label="contact">
          📩
        </span>
        Contact
      </a>
    </StyledMenu>
  );
};

export default Menu;
