import { useMixcloud } from "contexts/mixcloud";
import Head from "next/head";
import packageJson from "package.json";
import { DEFAULT_TITLE } from "utils/constants";

const { description } = packageJson;

const Metadata = (): JSX.Element => {
  const {
    mix: { details: mixDetails },
    track: { details: trackDetails },
  } = useMixcloud();

  const title =
    trackDetails?.trackName && mixDetails?.name
      ? `Stef.FM - ${trackDetails.trackName} - ${mixDetails.name}`
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
      <title>{title}</title>
    </Head>
  );
};

export default Metadata;
