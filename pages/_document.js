import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <div id="backdrop-hook"></div>
          <div id="modal-hook"></div>
          <div id="drawer-hook"></div>
          <NextScript />
        </body>
      </Html>
    );
  }
}
