import { StyledBurger } from "components/BurgerMenu/StyledBurgerMenu";
import { useMixcloud } from "contexts/mixcloud";
import useSound from "use-sound";

const Burger: React.FC = () => {
  const {
    session: { menuOpen, setMenuOpen },
  } = useMixcloud();

  const [playMenuOpen] = useSound("/audio/swish-open.mp3", {
    volume: 0.5,
  });
  const [playBurgerHover] = useSound("/audio/tap.mp3", {
    volume: 0.5,
  });

  return (
    <StyledBurger
      $open={menuOpen}
      onClick={() => {
        setMenuOpen(!menuOpen);
        playMenuOpen();
      }}
      onMouseEnter={() => playBurgerHover()}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
