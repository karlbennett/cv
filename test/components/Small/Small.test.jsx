import React, { useContext } from "react";
import { render } from "@testing-library/react";
import { SlotsContext } from "../../../src/components/Slots";
import { Small } from "../../../src/components/Small";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  ...mockReactComponent("Box"),
}));
jest.mock("../../../src/components/PersonalDetails", () => ({
  ...mockReactComponent("PersonalDetails"),
}));
jest.mock("../../../src/components/Header", () => ({
  ...mockReactComponent("Header"),
}));
jest.mock("../../../src/components/Block", () => ({
  ...mockReactComponent("Block"),
}));
jest.mock("../../../src/components/Experience", () => ({
  ...mockReactComponent("Experience"),
}));

describe("Small", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("renders without error", () => {
    const slots = {
      header: chance.string(),
      one: chance.string(),
      two: chance.string(),
    };

    // Given
    useContext.mockReturnValueOnce(slots);

    // When
    const actual = render(<Small />);

    // Then
    expect(useContext).toHaveBeenCalledWith(SlotsContext);
    expect(actual.getByTestId("PersonalDetails")).toBeVisible();
    expect(actual.getByTestId("Header")).toHaveTextContent(slots.header);
    expect(actual.queryAllByTestId("Block")[0]).toHaveTextContent(slots.one);
    expect(actual.getByTestId("Experience")).toHaveTextContent(slots.two);
  });
});
