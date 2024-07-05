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
    `Stef.FM - ${trackDetails?.trackName} - ${mixDetails?.name}` ||
    DEFAULT_TITLE;

  return (
    <Head>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <title>{title}</title>
    </Head>
  );
};

export default Metadata;
