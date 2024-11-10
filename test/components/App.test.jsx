import React, { useState } from "react";
import { create } from "react-test-renderer";
import { ReadMe } from "../../src/components/ReadMe";
import { SlotsContext } from "../../src/components/Slots";
import { Layout } from "../../src/components/Layout";
import { App } from "../../src/App";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
}));
jest.mock("../../src/components/Slots", () => ({
  SlotsContext: { Provider: mockReactComponent() },
}));
jest.mock("../../src/components/ReadMe", () => ({
  ReadMe: mockReactComponent(),
}));
jest.mock("../../src/components/Layout", () => ({
  Layout: mockReactComponent(),
}));

describe("App", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Can render with node", () => {
    const slots = {};
    const setSlots = jest.fn();
    const node = { tagName: chance.string() };
    const dataName = chance.string();

    // Given
    useState.mockReturnValueOnce([slots, setSlots]);

    // When
    const actual = create(<App />).root;
    actual.findByType(ReadMe).props.components.section({ node, "data-name": dataName });

    // Then
    expect(useState).toBeCalledWith({});
    expect(slots[dataName]).toBeDefined();
    expect(setSlots).toBeCalledWith(slots);
    expect(actual.findByType(SlotsContext.Provider).props.value).toBe(slots);
    expect(actual.findByType(Layout)).toBeDefined();
  });

  test("Can render without node", () => {
    const slots = chance.object();
    const setSlots = jest.fn();

    // Given
    useState.mockReturnValueOnce([slots, setSlots]);

    // When
    const actual = create(<App />).root;
    actual.findByType(ReadMe).props.components.section({});

    // Then
    expect(useState).toBeCalledWith({});
    expect(setSlots).toBeCalledWith(slots);
    expect(actual.findByType(SlotsContext.Provider).props.value).toBe(slots);
    expect(actual.findByType(Layout)).toBeDefined();
  });
});
