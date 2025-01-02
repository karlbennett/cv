import React from "react";

window.mockReactComponent = (name) => ({
  [name]: jest.fn(({ children }) => (<div data-testid={name}>{children}</div>))
});
window.mockAllReactComponents = (library) => Object.fromEntries(
  Object.keys(library).flatMap(k => Object.entries(mockReactComponent(k))),
);
