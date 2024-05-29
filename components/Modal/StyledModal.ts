import styled from "styled-components";

export const StyledModal = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 240px;
  width: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.3s ease,
    visibility 0.3s ease;

  &.modal-open {
    opacity: 1;
    visibility: visible;
  }

  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 999;
    opacity: 0;
    visibility: hidden;
    transition:
      opacity 0.3s ease,
      visibility 0.3s ease;
  }

  &.modal-open + .modal-overlay {
    opacity: 1;
    visibility: visible;
  }

  .modal-content {
    padding: 20px;
    text-align: center;
  }

  button {
    background: #007bff;
    border: none;
    color: white;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background: #0056b3;
  }
`;
