import { StyledMenu } from "components/BurgerMenu/StyledBurgerMenu";
import { useMixcloud } from "contexts/mixcloud";
import { useSession } from "contexts/session";

const Menu: React.FC = () => {
  const { menuOpen } = useSession();
  const {
    controls: { handleLoad },
    filters: { selectedCategory, setSelectedCategory },
  } = useMixcloud();

  const handleCategoryClick = (
    code: string,
    event: React.MouseEvent<HTMLAnchorElement>,
  ): void => {
    event.preventDefault(); // Prevent the default behavior of the anchor element
    setSelectedCategory(code);
  };

  return (
    <StyledMenu $open={menuOpen}>
      <ul>
        <a href="">[{selectedCategory}]</a>

        <li
          key="mpos"
          onClick={(event) => handleCategoryClick("mpos", event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCategoryClick("mpos", e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          My Pair of Shoes
        </li>

        <li
          key="aidm"
          onClick={(event) => handleCategoryClick("aidm", event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCategoryClick("aidm", e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          Adventures in Decent Music
        </li>

        <li
          key="cocksoup"
          onClick={(event) => handleCategoryClick("cocksoup", event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCategoryClick("cocksoup", e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          Cocksoup DJ Collective
        </li>

        <li
          key="special"
          onClick={(event) => handleCategoryClick("special", event)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleCategoryClick("special", e);
            }
          }}
          tabIndex={0}
          role="button"
        >
          Specials
        </li>
      </ul>
    </StyledMenu>
  );
};

export default Menu;
