import React from "react";
import { render } from "@testing-library/react";
import { Experience } from "../../../src/components/Experience";

jest.mock("@mui/material", () => ({
  Box: mockReactComponent("Box"),
}));

describe("Experience", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const text = chance.string();

    // When
    const actual = render(<Experience>{text}</Experience>);

    // Then
    expect(actual.getByTestId("Box")).toHaveTextContent(text);
  });
});
