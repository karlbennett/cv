import React, { useEffect, useState } from "react";
import { render } from "@testing-library/react";
import {
  ignoreNotFound,
  PersonalDetails,
  populatePersonal
} from "../../../src/components/PersonalDetails/PersonalDetails";

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
jest.mock("/personal.js", () => ({}), { virtual: true });

describe("Personal", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("Can populate the personal details.", () => {
    // Given
    const populate = jest.fn();
    const details = chance.object();

    // When
    populatePersonal(populate)({ details });

    // Then
    expect(populate).toHaveBeenCalledWith({ hasPersonal: true, details });
  });

  test("Do nothing on not found.", () => {
    // When
    ignoreNotFound();
  });

  test("Will render nothing if no personal details are supplied.", () => {
    // Given
    useState.mockReturnValueOnce([{}, jest.fn()]);
    useEffect.mockImplementationOnce((cb) => cb());

    // When
    const { container } = render(<PersonalDetails />);

    // Then
    expect(container).toBeEmptyDOMElement();
  });

  test("Will render personal details if they are supplied.", () => {
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
    expect(actual[0]).toHaveTextContent(personal.details.email);
    expect(actual[1]).toHaveTextContent(personal.details.phone);
    expect(actual[2]).toHaveTextContent(personal.details.address.text);
    expect(actual[3]).toHaveTextContent(personal.details.website);
  });
});
