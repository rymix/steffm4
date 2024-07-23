import styled from "styled-components";

export const StyledBackgroundSelect = styled.div``;

export const StyledPreviewBackground = styled.div<StyledPreviewBackground>`
  width: 260px;
  height: 196px;
  background-image: url(${(props) => props.$backgroundImage});
  background-size: ${(props) =>
    props.$tileType === "stretch" ? "100%" : "20%"};
  background-repeat: ${(props) =>
    props.$tileType === "stretch" ? "no-repeat" : "repeat"};
  border-radius: 20px;
`;
