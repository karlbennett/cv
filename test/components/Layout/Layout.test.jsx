import React from "react";
import { create } from "react-test-renderer";
import { useMediaQuery } from "@mui/material";
import theme from "../../../src/theme";
import { Big } from "../../../src/components/Big";
import { Small } from "../../../src/components/Small";
import { Layout } from "../../../src/components/Layout";

jest.mock("@mui/material", () => ({
  useMediaQuery: jest.fn(),
}));
jest.mock("../../../src/theme", () => ({
  breakpoints: { up: jest.fn() },
}));
jest.mock("../../../src/components/Big", () => ({
  Big: mockReactComponent(),
}));
jest.mock("../../../src/components/Small", () => ({
  Small: mockReactComponent(),
}));

describe("Layout", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Can render Big", () => {
    const up = chance.string();

    // Given
    theme.breakpoints.up.mockReturnValueOnce(up);
    useMediaQuery.mockReturnValueOnce(true);

    // When
    const actual = create(<Layout />).root;

    // Then
    expect(theme.breakpoints.up).toBeCalledWith("sm");
    expect(useMediaQuery).toBeCalledWith(up);
    expect(actual.findByType(Big)).toBeDefined();
  });

  test("Can render Small", () => {
    const up = chance.string();

    // Given
    theme.breakpoints.up.mockReturnValueOnce(up);
    useMediaQuery.mockReturnValueOnce(false);

    // When
    const actual = create(<Layout />).root;

    // Then
    expect(theme.breakpoints.up).toBeCalledWith("sm");
    expect(useMediaQuery).toBeCalledWith(up);
    expect(actual.findByType(Small).props).toBeDefined();
  });
});
