import React from "react";
import { create } from "react-test-renderer";
import { Box } from "@mui/material";
import { Header } from "../../../src/components/Header";

jest.mock("@mui/material", () => ({
  Box: mockReactComponent(),
}));

describe("Header", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const text = chance.string();

    // When
    const actual = create(<Header>{text}</Header>).root;

    // Then
    expect(actual.findByType(Box).props).toMatchObject({ children: text });
  });
});
