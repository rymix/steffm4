import Head from "next/head";
import packageJson from "package.json";

const { description } = packageJson;

const Metadata = (): JSX.Element => {
  return (
    <Head>
      <meta name="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      />
      <title>{description}</title>
    </Head>
  );
};

export default Metadata;
