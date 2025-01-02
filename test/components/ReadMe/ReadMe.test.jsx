import React from "react";
import { render } from "@testing-library/react";
import Markdown from "react-markdown";
import README from "../../../README.md";
import { ReadMe } from "../../../src/components/ReadMe";

jest.mock("react-markdown", () => (mockReactComponent("Markdown")["Markdown"]));
jest.mock("../../../src/components/Header", () => ({
  ...mockReactComponent("Header"),
}));
jest.mock("../../../src/components/Layout", () => ({
  ...mockReactComponent("Layout"),
}));
jest.mock("../../../src/components/Block", () => ({
  ...mockReactComponent("Block"),
}));
jest.mock("../../../README.md", () => ("Read me."));

describe("ReadMe", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const components = chance.object();

    // When
    render(<ReadMe components={components} />).getByTestId("Markdown");

    // Then
    expect(Markdown.mock.calls[0][0])
      .toMatchObject({ components, children: README });
  });
});
