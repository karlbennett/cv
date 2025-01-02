import React, { useState } from "react";
import { render } from "@testing-library/react";
import { ReadMe } from "../src/components/ReadMe";
import { SlotsContext } from "../src/components/Slots";
import { App } from "../src/App";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
jest.mock("../src/components/Slots", () => ({
  SlotsContext: mockReactComponent("Provider"),
}));
jest.mock("../src/components/ReadMe", () => ({
  ...mockReactComponent("ReadMe"),
}));
jest.mock("../src/components/Layout", () => ({
  ...mockReactComponent("Layout"),
}));

describe("App", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("Can render with node", () => {
    const slots = {};
    const setSlots = jest.fn();
    const node = { tagName: chance.string() };
    const dataName = chance.string();

    // Given
    useState.mockReturnValueOnce([slots, setSlots]);

    // When
    const actual = render(<App />);
    ReadMe.mock.calls[0][0].components.section({ node, "data-name": dataName });

    // Then
    expect(useState).toBeCalledWith({});
    expect(slots[dataName]).toBeDefined();
    expect(setSlots).toBeCalledWith(slots);
    expect(SlotsContext.Provider.mock.calls[0][0])
      .toMatchObject({ value: slots });
    expect(actual.getByTestId("Layout")).toBeVisible();
  });

  test("Can render without node", () => {
    const slots = chance.object();
    const setSlots = jest.fn();

    // Given
    useState.mockReturnValueOnce([slots, setSlots]);

    // When
    const actual = render(<App />);
    ReadMe.mock.calls[0][0].components.section({});

    // Then
    expect(useState).toBeCalledWith({});
    expect(setSlots).toBeCalledWith(slots);
    expect(SlotsContext.Provider.mock.calls[0][0])
      .toMatchObject({ value: slots });
    expect(actual.getByTestId("Layout")).toBeVisible();
  });
});
