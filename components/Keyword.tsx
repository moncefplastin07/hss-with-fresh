/** @jsx h */
import { h } from "preact";
import { tw } from "@twind";

export default function Keyword(props: h.JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <b className={tw`bg-green-200`}>{props.children}</b>
  );
}
