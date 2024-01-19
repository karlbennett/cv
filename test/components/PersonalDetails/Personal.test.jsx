/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useEffect, useState } from "react";
import { Link } from "@mui/material";
import { create } from "react-test-renderer";
import { EMPTY_PERSONAL_DETAILS } from "../../../src/empties";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect: jest.fn(),
  useState: jest.fn(),
}));
jest.mock("@mui/material", () => ({
  List: mockReactComponent(),
  ListItem: mockReactComponent(),
  ListItemIcon: mockReactComponent(),
  Link: mockReactComponent(),
}));
jest.mock("../../../src/components/Block", () => ({
  Block: mockReactComponent(),
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
    const actual = create(<PersonalDetails />);

    // Then
    expect(setPersonal).toBeCalledWith({ hasPersonal: false, details: EMPTY_PERSONAL_DETAILS });
    expect(actual.toJSON()).toBeNull();
  });

  test("Will render personal details if they are supplied.", () => {
    process.env.PERSONAL = "true";
    const personalJson = require("../../../personal.json");
    personalJson.something = chance.string();
    const { Block } = require("../../../src/components/Block");
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
    const actual = create(<PersonalDetails />).root.findByType(Block).findAllByType(Link);

    // Then
    expect(setPersonal).toBeCalledWith({ hasPersonal: true, details: personalJson });
    expect(actual[0].props.children).toBe(personal.details.email);
    expect(actual[1].props.children).toBe(personal.details.phone);
    expect(actual[2].props.children).toBe(personal.details.address.text);
    expect(actual[3].props.children).toBe(personal.details.website);
  });
});
