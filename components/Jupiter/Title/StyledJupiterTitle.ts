import styled from "styled-components";

const noiseBackground = `
  data:image/png;base64,
  iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/wcAAn8CBG0xnoYAAAAASUVORK5CYII=
`;

export const StyledJupiterTitleWrapper = styled.div`
  align-items: center;
  background: #e23e2e;
  background-image: url(${noiseBackground});
  background-size: cover;
  border-radius: 4px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 8px 12px;
  margin-bottom: 12px;
  letter-spacing: 0.05rem;
`;

export const StyledJupiterTitle = styled.div`
  align-items: center;
  background: #565555;
  background-image: url(${noiseBackground});
  background-size: cover;
  border-radius: 4px;
  color: white;
  display: flex;
  flex-direction: row;
  justify-content: center;
  font-size: 16px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 4px 12px;
`;
