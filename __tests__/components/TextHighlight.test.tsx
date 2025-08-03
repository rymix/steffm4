import { render, screen } from "@testing-library/react";
import TextHighlight from "components/TextHighlight";

describe("TextHighlight Component", () => {
  it("should render text without highlighting when no search words", () => {
    render(<TextHighlight textToHighlight="Hello World" searchWords={[]} />);

    expect(screen.getByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByRole("mark")).not.toBeInTheDocument();
  });

  it("should highlight matching text", () => {
    render(
      <TextHighlight
        textToHighlight="Hello World Test"
        searchWords={["World"]}
      />,
    );

    const highlightedText = screen.getByText("World");
    expect(highlightedText).toBeInTheDocument();
    expect(highlightedText.tagName).toBe("MARK");
  });

  it("should highlight multiple search words", () => {
    render(
      <TextHighlight
        textToHighlight="Hello World Test"
        searchWords={["Hello", "Test"]}
      />,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getAllByRole("mark")).toHaveLength(2);
  });

  it("should be case insensitive by default", () => {
    render(
      <TextHighlight
        textToHighlight="Hello WORLD test"
        searchWords={["world", "TEST"]}
      />,
    );

    expect(screen.getByText("WORLD")).toBeInTheDocument();
    expect(screen.getByText("test")).toBeInTheDocument();
  });

  it("should apply custom CSS class", () => {
    render(
      <TextHighlight
        textToHighlight="Hello World"
        searchWords={["World"]}
        highlightClassName="custom-highlight"
      />,
    );

    const highlightedText = screen.getByText("World");
    expect(highlightedText).toHaveClass("custom-highlight");
  });

  it("should handle empty text", () => {
    render(<TextHighlight textToHighlight="" searchWords={["test"]} />);

    expect(screen.queryByRole("mark")).not.toBeInTheDocument();
  });

  it("should filter out empty search words", () => {
    render(
      <TextHighlight
        textToHighlight="Hello World"
        searchWords={["", "  ", "World"]}
      />,
    );

    expect(screen.getByText("World")).toBeInTheDocument();
    expect(screen.getAllByRole("mark")).toHaveLength(1);
  });

  it("should escape regex characters when autoEscape is true", () => {
    render(
      <TextHighlight
        textToHighlight="Price: $10.99 (special)"
        searchWords={["$10.99", "(special)"]}
        autoEscape
      />,
    );

    expect(screen.getByText("$10.99")).toBeInTheDocument();
    expect(screen.getByText("(special)")).toBeInTheDocument();
    expect(screen.getAllByRole("mark")).toHaveLength(2);
  });
});
