import "@testing-library/jest-dom";
import "chance";
import object from "chance-object";
import "./mockReactComponents";
import "./testFinders";

chance.mixin({ object });

// Make sure the app Element exists so that the React app can render in it.
const root = document.createElement("div");
root.setAttribute("id", "root");
document.documentElement.appendChild(root);
