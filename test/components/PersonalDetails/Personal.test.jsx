/* eslint-disable @typescript-eslint/no-require-imports */
import React, { useEffect, useState } from "react";
import { render } from "@testing-library/react";
import { EMPTY_PERSONAL_DETAILS } from "../../../src/empties";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  ...mockReactComponent("List"),
  ...mockReactComponent("ListItem"),
  ...mockReactComponent("ListItemIcon"),
  ...mockReactComponent("Link"),
}));
jest.mock("../../../src/components/Block", () => ({
  ...mockReactComponent("Block"),
}));
jest.mock("../../../personal.json", () => ({}));

describe("Personal", () => {
  let _env;

  beforeEach(() => {
    _env = process.env;
    process.env = {};
  });

  afterEach(() => {
    jest.restoreAllMocks();
    process.env = _env;
  });

  test("Will render nothing if no personal details are supplied.", () => {
    const { PersonalDetails } = require("../../../src/components/PersonalDetails");
    const personal = chance.object();
    const setPersonal = jest.fn();

    // Given
    useState.mockReturnValueOnce([personal, setPersonal]);
    useEffect.mockImplementationOnce((cb) => cb());

    // When
    const { container } = render(<PersonalDetails />);

    // Then
    expect(setPersonal).toHaveBeenCalledWith({ hasPersonal: false, details: EMPTY_PERSONAL_DETAILS });
    expect(container).toBeEmptyDOMElement();
  });

  test("Will render personal details if they are supplied.", () => {
    process.env.PERSONAL = "true";
    const personalJson = require("../../../personal.json");
    personalJson.something = chance.string();
    const { PersonalDetails } = require("../../../src/components/PersonalDetails");
    const setPersonal = jest.fn();
    const personal = {
      hasPersonal: true,
      details: {
        email: chance.string(),
        phone: chance.string(),
        address: {
          link: chance.string(),
          text: chance.string(),
        },
        website: chance.string(),
      },
    };

    // Given
    useState.mockReturnValueOnce([personal, setPersonal]);
    useEffect.mockImplementationOnce((cb) => cb());

    // When
    const actual = render(<PersonalDetails />).queryAllByTestId("Link");

    // Then
    expect(setPersonal).toHaveBeenCalledWith({ hasPersonal: true, details: personalJson });
    expect(actual[0]).toHaveTextContent(personal.details.email);
    expect(actual[1]).toHaveTextContent(personal.details.phone);
    expect(actual[2]).toHaveTextContent(personal.details.address.text);
    expect(actual[3]).toHaveTextContent(personal.details.website);
  });
});
