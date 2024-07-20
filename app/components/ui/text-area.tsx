import {
  TextArea as RACTextArea,
  TextAreaProps as RACTextAreaProps,
} from "react-aria-components";

export type TextAreaProps = RACTextAreaProps;

export const TextArea = (props: TextAreaProps) => {
  return <RACTextArea {...props} />;
};
