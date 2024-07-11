import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { StyledMixFavourite } from "components/Favourite/StyledFavourite";
import { FavouriteProps } from "components/Favourite/types";
import { useMixcloud } from "contexts/mixcloud";

export const Favourite: React.FC<FavouriteProps> = ({ mix }) => {
  const {
    favourites: { addFavourite, isFavourite, removeFavourite },
  } = useMixcloud();

  const handleToggleFavourite = (): void => {
    if (isFavourite(mix.mixcloudKey)) {
      removeFavourite(mix.mixcloudKey);
    } else {
      addFavourite(mix.mixcloudKey);
    }
  };

  return (
    <StyledMixFavourite onClick={handleToggleFavourite}>
      {isFavourite(mix.mixcloudKey) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
    </StyledMixFavourite>
  );
};

export default Favourite;
