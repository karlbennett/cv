import React from "react";

window.mockReactComponent = (name) =>
  jest.fn(({ children }) => (<div data-testid={name}>{children}</div>));
window.mockAllReactComponents = (library) => Object.fromEntries(
  Object.keys(library).map(k => [k, mockReactComponent(k)]),
);
