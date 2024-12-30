import React from "react";
import { render } from "@testing-library/react";
import { Block } from "../../../src/components/Block";

jest.mock("@mui/material", () => ({
  Box: mockReactComponent("Box"),
}));

describe("Block", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const text = chance.string();

    // When
    const actual = render(<Block>{text}</Block>);

    // Then
    expect(actual.getByTestId("Box")).toHaveTextContent(text);
  });
});
