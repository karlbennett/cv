import React from "react";
import { render } from "@testing-library/react";
import { useMediaQuery } from "@mui/material";
import theme from "../../../src/theme";
import { Layout } from "../../../src/components/Layout";

jest.mock("@mui/material", () => ({
  useMediaQuery: jest.fn(),
}));
jest.mock("../../../src/theme", () => ({
  breakpoints: { up: jest.fn() },
}));
jest.mock("../../../src/components/Big", () => ({
  Big: mockReactComponent("Big"),
}));
jest.mock("../../../src/components/Small", () => ({
  Small: mockReactComponent("Small"),
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
    const actual = render(<Layout />);

    // Then
    expect(theme.breakpoints.up).toBeCalledWith("sm");
    expect(useMediaQuery).toBeCalledWith(up);
    expect(actual.queryAllByTestId("Small")).toEqual([]);
    expect(actual.getByTestId("Big")).toBeVisible();
  });

  test("Can render Small", () => {
    const up = chance.string();

    // Given
    theme.breakpoints.up.mockReturnValueOnce(up);
    useMediaQuery.mockReturnValueOnce(false);

    // When
    const actual = render(<Layout />);

    // Then
    expect(theme.breakpoints.up).toBeCalledWith("sm");
    expect(useMediaQuery).toBeCalledWith(up);
    expect(actual.queryAllByTestId("Big")).toEqual([]);
    expect(actual.getByTestId("Small")).toBeVisible();
  });
});
