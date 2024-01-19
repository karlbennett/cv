import React from "react";
import { create } from "react-test-renderer";
import { Box } from "@mui/material";
import { Experience } from "../../../src/components/Experience";

jest.mock("@mui/material", () => ({
  Box: mockReactComponent(),
}));

describe("Experience", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    // Given
    const text = chance.string();

    // When
    const actual = create(<Experience>{text}</Experience>).root;

    // Then
    expect(actual.findByType(Box).props).toMatchObject({ children: text });
  });
});
