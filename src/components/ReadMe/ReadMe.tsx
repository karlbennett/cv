import React, { ClassAttributes, HTMLAttributes } from "react";
import rehypeRaw from "rehype-raw";
import Markdown, { ExtraProps } from "react-markdown";
import README from "../../../README.md";

interface Data {
  "data-name": string;
}

export type Props = ClassAttributes<HTMLElement> & HTMLAttributes<HTMLElement> & ExtraProps & Data;

export type Callback = (props: Props) => void;

interface RmProps {
  components: { [tag: string]: Callback };
}

export const ReadMe: React.FC<RmProps> = ({ components }) => {
  return (
    <div style={{ display: "none" }}>
      <Markdown rehypePlugins={[rehypeRaw]} components={components}>{README}</Markdown>
    </div>
  );
};
