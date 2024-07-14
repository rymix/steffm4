import type { JupiterCaseProps } from "components/Jupiter/Case/types";
import Coffee from "components/Jupiter/Table/Coffee";
import Pencil from "components/Jupiter/Table/Pencil";
import { StyledJupiterTable } from "components/Jupiter/Table/StyledJupiterTable";

const JupiterTable: React.FC<JupiterCaseProps> = ({ children }) => {
  return (
    <StyledJupiterTable>
      <Coffee />
      <Pencil />
      {children}
    </StyledJupiterTable>
  );
};

export default JupiterTable;
