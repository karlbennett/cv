import React from "react";
import { create } from "react-test-renderer";
import Markdown from "react-markdown";
import README from "../../../README.md";
import { ReadMe } from "../../../src/components/ReadMe";

jest.mock("react-markdown", () => (mockReactComponent()));
jest.mock("../../../src/components/Header", () => ({
  Header: mockReactComponent(),
}));
jest.mock("../../../src/components/Layout", () => ({
  Layout: mockReactComponent(),
}));
jest.mock("../../../src/components/Block", () => ({
  Block: mockReactComponent(),
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
    const actual = create(<ReadMe components={components} />).root.findByType(Markdown);

    // Then
    expect(actual.props.components).toBe(components);
    expect(actual.props.children).toBe(README);
  });
});
