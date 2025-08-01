import { render, screen } from "@testing-library/react";
import Home from "pages/index";
import { useMixcloud } from "contexts/mixcloud";

// Mock the context
jest.mock("contexts/mixcloud", () => ({
  useMixcloud: jest.fn(),
}));

// Mock the main Jupiter component (which includes all the others)
jest.mock("components", () => {
  return function MockComponents() {
    return <div data-testid="jupiter-component">Jupiter Synthesizer UI</div>;
  };
});

// Mock ReactGA
jest.mock("react-ga4", () => ({
  gtag: jest.fn(),
  initialize: jest.fn(),
  event: jest.fn(),
  send: jest.fn(),
}));

// Mock constants
jest.mock("utils/constants", () => ({
  GA4: "test-ga4",
  GOOGLE_TRACKING_ID: "test-tracking-id",
}));

const mockUseMixcloud = useMixcloud as jest.MockedFunction<typeof useMixcloud>;

// Mock Next.js Head component
jest.mock("next/head", () => {
  return function MockHead({ children }: { children: React.ReactNode }) {
    return <div data-testid="mock-head">{children}</div>;
  };
});

describe("Home Page", () => {
  beforeEach(() => {
    mockUseMixcloud.mockReturnValue({
      mcKey: "",
      setIsReady: jest.fn(),
      controls: {
        handleLoad: jest.fn(),
        handleLoadRandom: jest.fn(),
        handleLoadRandomFavourite: jest.fn(),
        handleSeek: jest.fn(),
      },
      filters: { selectedCategory: null },
      history: { latestMcKey: "", latestProgress: [] },
      widget: { playing: false },
    } as any);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render main Jupiter component", () => {
    render(<Home />);

    expect(screen.getByTestId("jupiter-component")).toBeInTheDocument();
    expect(screen.getByText("Jupiter Synthesizer UI")).toBeInTheDocument();
  });

  it("should render without crashing", () => {
    expect(() => render(<Home />)).not.toThrow();
  });

  it("should use mixcloud context", () => {
    render(<Home />);

    expect(mockUseMixcloud).toHaveBeenCalled();
  });
});