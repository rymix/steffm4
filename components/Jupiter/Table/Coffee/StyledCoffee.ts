import styled from "styled-components";

const StyledCoffee = styled.div`
  background: url("/table/coffee-stain.png") no-repeat;
  background-size: 280px 280px;
  height: 280px;
  left: 20px;
  opacity: 0.25;
  position: absolute;
  top: 20px;
  width: 280px;
  z-index: 2;

  @media (max-width: 768px) {
    opacity: 0;
  }
`;

export default StyledCoffee;
