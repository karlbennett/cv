import React, { useContext } from "react";
import { create } from "react-test-renderer";
import { SlotsContext } from "../../../src/components/Slots";
import { PersonalDetails } from "../../../src/components/PersonalDetails";
import { Header } from "../../../src/components/Header";
import { Block } from "../../../src/components/Block";
import { Experience } from "../../../src/components/Experience";
import { Small } from "../../../src/components/Small";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  Box: mockReactComponent(),
}));
jest.mock("../../../src/components/PersonalDetails", () => ({
  PersonalDetails: mockReactComponent(),
}));
jest.mock("../../../src/components/Header", () => ({
  Header: mockReactComponent(),
}));
jest.mock("../../../src/components/Block", () => ({
  Block: mockReactComponent(),
}));
jest.mock("../../../src/components/Experience", () => ({
  Experience: mockReactComponent(),
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
    const actual = create(<Small />).root;

    // Then
    expect(useContext).toBeCalledWith(SlotsContext);
    expect(actual.findByType(PersonalDetails)).toBeDefined();
    expect(actual.findByType(Header).props.children).toEqual(slots.header);
    expect(actual.findAllByType(Block)[0].props.children).toEqual(slots.one);
    expect(actual.findByType(Experience).props.children).toEqual(slots.two);
  });
});
