// setupTests.ts
// eslint-disable-next-line import/no-extraneous-dependencies
import "@testing-library/jest-dom";

import fetchMock from "jest-fetch-mock";

// Enable fetch mocking globally for all tests
fetchMock.enableMocks();

fetchMock.mockResponseOnce(
  JSON.stringify({
    categories: ["Category 1", "Category 2"],
  }),
);
