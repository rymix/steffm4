import styled from "styled-components";

export const InstallInstructionsWrapper = styled.div`
  padding: 20px;
  text-align: left;
`;

export const InstallButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const InstructionsText = styled.p`
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
`;

export const InstructionsList = styled.ol`
  font-size: 16px;
  color: #333;
  margin-bottom: 20px;
  padding-left: 20px;

  li {
    list-style-type: upper-roman;
    margin: 0 0 5px 30px;
  }
`;
