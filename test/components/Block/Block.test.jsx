import React from "react";
import { create } from "react-test-renderer";
import { Box } from "@mui/material";
import { Block } from "../../../src/components/Block";

jest.mock("@mui/material", () => ({
  Box: mockReactComponent(),
}));

describe("Block", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const text = chance.string();

    // When
    const actual = create(<Block>{text}</Block>).root;

    // Then
    expect(actual.findByType(Box).props).toMatchObject({ children: text });
  });
});
