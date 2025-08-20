import type { DocumentContext, DocumentInitialProps } from "next/document";
import Document, { Head, Html, Main, NextScript } from "next/document";
import { JSX } from "react";
import withStyledComponents from "styles/withStyledComponents";
import { DEFAULT_LOCALE } from "utils/constants";

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    return withStyledComponents(ctx);
  }

  render(): JSX.Element {
    return (
      <Html lang={DEFAULT_LOCALE}>
        <Head>
          {/* Preload critical custom fonts to prevent FOUC */}
          <link
            rel="preload"
            href="/fonts/enhanced_dot_digital-7.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Sforzando W00.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/DSEG14Classic-Regular.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            href="/fonts/Microgramma W01 Bold Extended.woff2"
            as="font"
            type="font/woff2"
            crossOrigin="anonymous"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
