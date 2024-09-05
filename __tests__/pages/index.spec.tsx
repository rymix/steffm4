import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

// Simple test to render "Hello World" and ensure it's in the document
test("renders 'Hello World'", () => {
  // Render the element with the text
  render(<div>Hello World</div>);

  // Expect that the rendered element contains the text "Hello World"
  expect(screen.getByText(/hello world/i)).toBeInTheDocument();
});
