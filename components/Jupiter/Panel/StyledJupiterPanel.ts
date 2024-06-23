import styled from "styled-components";

const noiseBackground = `
  data:image/png;base64,
  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAn8CBG0xnoYAAAAASUVORK5CYII=
`;

export const StyledJupiterPanel = styled.div`
  background: #3d3e3e;
  background-image: url(${noiseBackground});
  background-size: cover;
  padding: 10px;
`;
