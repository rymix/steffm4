import styled from "styled-components";

export const StyledAdminWrapper = styled.div`
  height: 100vh;
  overflow: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const StyledAdminTable = styled.table`
  border-collapse: collapse;
  margin: 20px;

  td {
    border: 1px solid lightgrey;
    padding: 4px;
  }
`;

export const StyledAdminButtonBlock = styled.div`
  display: flex;
  margin: 20px;
`;

export const StyledAdminButton = styled.button`
  background: lightgrey;
  border: 1px solid grey;
  cursor: pointer;
  margin: 0 4px 0 0;
  padding: 4px;

  &:hover {
    background: grey;
  }
`;

export const StyledAdminFormElements = styled.div`
  margin: 20px;

  div {
    display: grid;
    grid-template-columns: 200px 400px;
  }

  input {
    border: 1px solid lightgrey;
    margin: 0 0 4px 0;
    padding: 4px;
  }
`;
