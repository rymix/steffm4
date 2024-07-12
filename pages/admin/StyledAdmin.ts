import styled from "styled-components";

export const StyledAdminTable = styled.table`
  border-collapse: collapse;
  margin: 20px;

  td {
    border: 1px solid lightgrey;
    padding: 4px;
  }
`;

export const StyledAdminButton = styled.table`
  background: lightgrey;
  border: 1px solid grey;
  cursor: pointer;
  padding: 4px;

  &:hover {
    background: grey;
  }
`;

export const StyledAdminForm = styled.form`
  margin: 20px;

  div {
    display: grid;
    grid-template-columns: 100px 200px;
  }

  input {
    border: 1px solid grey;
    padding: 4px;
  }
`;
