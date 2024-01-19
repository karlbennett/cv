import React from "react";

window.mockReactComponent = () => jest.fn(({ children }) => (<div>{children}</div>));
window.mockAllReactComponents = (library) => Object.fromEntries(
  Object.keys(library).map(k => [k, mockReactComponent()]),
);
