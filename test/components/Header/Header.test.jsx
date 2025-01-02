import React from "react";
import { render } from "@testing-library/react";
import { Header } from "../../../src/components/Header";

jest.mock("@mui/material", () => ({
  ...mockReactComponent("Box"),
}));

describe("Header", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const text = chance.string();

    // When
    const actual = render(<Header>{text}</Header>);

    // Then
    expect(actual.getByTestId("Box")).toHaveTextContent(text);
  });
});
