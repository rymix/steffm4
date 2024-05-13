import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

test("Hello World test", () => {
  render(<div>Hello World</div>);
  expect(screen.getByText("Hello World")).toBeInTheDocument();
});
