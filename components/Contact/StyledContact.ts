import styled from "styled-components";

export const StyledContact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledRow = styled.a`
  display: flex;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  text-decoration: none;
  color: rgba(0, 0, 0, 0.7);
  font-weight: 600;
  font-size: 1.2em;
  transition: color 0.3s;

  &:hover {
    color: rgba(0, 0, 0, 1);
  }
`;

export const StyledIconWrapper = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg,
  img {
    font-size: 2em;
    width: 1em;
    height: auto;
  }
`;

export const StyledTextWrapper = styled.div`
  width: 60%;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  span {
    margin-left: 10px;
  }
`;
