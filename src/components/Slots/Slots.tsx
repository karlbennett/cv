import { createContext, ReactNode } from "react";

export type Slots = { [name: string]: ReactNode };

export const SlotsContext = createContext({} as Slots);
