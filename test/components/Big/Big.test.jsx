/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useContext } from "react";
import { create } from "react-test-renderer";
import { usePersonal, PersonalDetails } from "../../../src/components/PersonalDetails";
import { SlotsContext } from "../../../src/components/Slots";
import { Header } from "../../../src/components/Header";
import { Block } from "../../../src/components/Block";
import { Experience } from "../../../src/components/Experience";
import { Big } from "../../../src/components/Big";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  Box: mockReactComponent(),
  Grid: mockReactComponent(),
}));
jest.mock("../../../src/components/PersonalDetails", () => ({
  PersonalDetails: mockReactComponent(),
  usePersonal: jest.fn(),
}));
jest.mock("../../../src/components/Header", () => ({
  Header: mockReactComponent(),
}));
jest.mock("../../../src/components/Slots", () => ({
  SlotsContext: mockReactComponent(),
}));
jest.mock("../../../src/components/Block", () => ({
  Block: mockReactComponent(),
}));
jest.mock("../../../src/components/Experience", () => ({
  Experience: mockReactComponent(),
}));

describe("Big", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Can render without personal details.", () => {
    const slots = {
      header: chance.string(),
      profile: chance.string(),
      skills: chance.string(),
      education: chance.string(),
      tools: chance.string(),
      experience: chance.string(),
    };

    // Given
    usePersonal.mockReturnValueOnce({ hasPersonal: false });
    useContext.mockReturnValueOnce(slots);

    // When
    const actual = create(<Big />).root;

    // Then
    expect(useContext).toBeCalledWith(SlotsContext);
    expect(actual.findByType(Header).props.children).toEqual(slots.header);
    expect(actual.findAllByType(PersonalDetails)).toEqual([]);
    const blocks = actual.findAllByType(Block);
    expect(blocks[0].props.children).toEqual(slots.profile);
    expect(blocks[1].props.children).toEqual(slots.skills);
    expect(blocks[2].props.children).toEqual(slots.education);
    expect(blocks[3].props.children).toEqual(slots.tools);
    expect(actual.findByType(Experience).props.children).toEqual(slots.experience);
  });

  test("Can render with personal details.", () => {
    const slots = {
      header: chance.string(),
      profile: chance.string(),
      skills: chance.string(),
      education: chance.string(),
      tools: chance.string(),
      experience: chance.string(),
    };

    // Given
    usePersonal.mockReturnValueOnce({ hasPersonal: true });
    useContext.mockReturnValueOnce(slots);

    // When
    const actual = create(<Big />).root;

    // Then
    expect(useContext).toBeCalledWith(SlotsContext);
    expect(actual.findByType(Header).props.children).toEqual(slots.header);
    expect(actual.findByType(PersonalDetails)).toBeDefined();
    const blocks = actual.findAllByType(Block);
    expect(blocks[0].props.children).toEqual(slots.profile);
    expect(blocks[1].props.children).toEqual(slots.skills);
    expect(blocks[2].props.children).toEqual(slots.education);
    expect(blocks[3].props.children).toEqual(slots.tools);
    expect(actual.findByType(Experience).props.children).toEqual(slots.experience);
  });
});
