import styled from "styled-components";

const StyledPencil = styled.div`
  background: url("/table/pencil2.png") no-repeat;
  background-size: 150px 550px;
  bottom: 20px;
  height: 550px;
  opacity: 1;
  position: absolute;
  right: 50px;
  width: 150px;
  z-index: 2;

  @media (max-width: 1200px) {
    opacity: 0;
  }
`;

export default StyledPencil;
