/** @jsx h */
import { h } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { tw } from "@twind";

const Layout = ({ children, title = 'This is the default title' }) => (
  <div>
    <head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </head>
    <header>
    </header>
    <div className={tw`text-center`}>
      {children}
    </div>
    <footer className={tw`text-center mt-5`}>
      <hr />
      <span>مرحبا 👋</span>
    </footer>
  </div>
)

export default Layout
