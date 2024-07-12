import styled from "styled-components";

export const StyledAdminTable = styled.table`
  border-collapse: collapse;
  margin: 20px;

  td {
    border: 1px solid lightgrey;
    padding: 4px;
  }
`;

export const StyledAdminButtonBlock = styled.table`
  display: flex;
`;

export const StyledAdminButton = styled.table`
  background: lightgrey;
  border: 1px solid grey;
  cursor: pointer;
  margin: 0 4px 0 0;
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
    border: 1px solid lightgrey;
    margin: 0 0 4px 0;
    padding: 4px;
  }
`;
