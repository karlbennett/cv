/* eslint-disable @typescript-eslint/no-require-imports */
import { createContext } from "react";

jest.mock("react", () => ({
  createContext: jest.fn(),
}));

describe("Slots", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Can create the SlotsContext", () => {
    const context = chance.object();

    // Given
    createContext.mockReturnValueOnce(context);

    // When
    const { SlotsContext } = require("../../../src/components/Slots");

    // Then
    expect(SlotsContext).toBe(context);
  });
});
