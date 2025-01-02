import React, { useContext } from "react";
import { render } from "@testing-library/react";
import { usePersonal } from "../../../src/components/PersonalDetails";
import { SlotsContext } from "../../../src/components/Slots";
import { Big } from "../../../src/components/Big";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useContext: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  ...mockReactComponent("Box"),
  ...mockReactComponent("Grid"),
}));
jest.mock("../../../src/components/PersonalDetails", () => ({
  ...mockReactComponent("PersonalDetails"),
  usePersonal: jest.fn(),
}));
jest.mock("../../../src/components/Header", () => ({
  ...mockReactComponent("Header"),
}));
jest.mock("../../../src/components/Slots", () => ({
  ...mockReactComponent("SlotsContext"),
}));
jest.mock("../../../src/components/Block", () => ({
  ...mockReactComponent("Block"),
}));
jest.mock("../../../src/components/Experience", () => ({
  ...mockReactComponent("Experience"),
}));

describe("Big", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Can render without personal details.", async () => {
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
    const actual = render(<Big />);

    // Then
    expect(useContext).toBeCalledWith(SlotsContext);
    expect(actual.getByTestId("Header")).toHaveTextContent(slots.header);
    expect(actual.queryAllByTestId("PersonalDetails")).toEqual([]);
    const blocks = await actual.findAllByTestId("Block");
    expect(blocks[0]).toHaveTextContent(slots.profile);
    expect(blocks[1]).toHaveTextContent(slots.skills);
    expect(blocks[2]).toHaveTextContent(slots.education);
    expect(blocks[3]).toHaveTextContent(slots.tools);
    expect(actual.getByTestId("Experience")).toHaveTextContent(slots.experience);
  });

  test("Can render with personal details.", async () => {
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
    const actual = render(<Big />);

    // Then
    expect(useContext).toBeCalledWith(SlotsContext);
    expect(actual.getByTestId("Header")).toHaveTextContent(slots.header);
    expect(actual.getByTestId("PersonalDetails")).toBeVisible();
    const blocks = await actual.findAllByTestId("Block");
    expect(blocks[0]).toHaveTextContent(slots.profile);
    expect(blocks[1]).toHaveTextContent(slots.skills);
    expect(blocks[2]).toHaveTextContent(slots.education);
    expect(blocks[3]).toHaveTextContent(slots.tools);
    expect(actual.getByTestId("Experience")).toHaveTextContent(slots.experience);
  });
});
