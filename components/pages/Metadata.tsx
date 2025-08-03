import { useMixcloud } from "contexts/mixcloud";
import Head from "next/head";
import packageJson from "package.json";
import { JSX } from "react";
import { DEFAULT_TITLE } from "utils/constants";

const { description } = packageJson;

const Metadata = (): JSX.Element => {
  const {
    mix: { details: mixDetails },
    track: { details: trackDetails },
  } = useMixcloud();

  const title =
    trackDetails?.trackName && mixDetails?.name
      ? `${trackDetails.trackName} - ${mixDetails.name} - Stef.FM`
      : DEFAULT_TITLE;

  return (
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={DEFAULT_TITLE} />
      <meta
        name="og:description"
        property="og:description"
        content={description}
      />
      <meta property="og:site_name" content="Stef.FM" />
      <meta property="og:url" content="https://stef.fm" />
      <meta
        name="og:image"
        property="og:image"
        content="https://stef.fm/backgrounds/stefmasters-s.png"
      />
      <meta
        name="twitter:card"
        content="https://stef.fm/backgrounds/stefmasters-s.png"
      />
      <meta name="twitter:site" content="@fm_stef" />
      <meta name="twitter:creator" content="@fm_stef" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      <title>{title}</title>
    </Head>
  );
};

export default Metadata;
