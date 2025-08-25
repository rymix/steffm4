import { StyledDx7Item } from "components/Dx7/Item/StyledDx7Item";
import { Dx7ItemProps } from "components/Dx7/Item/types";

const Dx7Item: React.FC<Dx7ItemProps> = ({ children }) => {
  return <StyledDx7Item>{children}</StyledDx7Item>;
};

export default Dx7Item;
