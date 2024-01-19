import React, { Dispatch, SetStateAction, useState } from "react";
import { Props, ReadMe } from "./components/ReadMe";
import { Slots, SlotsContext } from "./components/Slots";
import { Layout } from "./components/Layout";

const addSlot = (slots: Slots, setSlots: Dispatch<SetStateAction<Slots>>) => ({ node, ...rest }: Props): void => {
  const name = rest["data-name"];
  if (node) {
    slots[name] = (<node.tagName {...rest} />);
  }
  setSlots(slots);
};

export const App: React.FC = () => {
  const [slots, setSlots] = useState({} as Slots);
  return (
    <>
      <ReadMe components={{ section: addSlot(slots, setSlots) }} />
      <SlotsContext.Provider value={slots}>
        <Layout />
      </SlotsContext.Provider>
    </>
  );
};
