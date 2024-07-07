import { CircularProgress } from "@mui/material";
import MixRow from "components/MixList/MixRow";
import type { Mix } from "db/types";
import _ from "lodash";
import React, { useEffect, useState } from "react";

export const MixList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mixes, setMixes] = useState<Mix[]>([]);

  useEffect(() => {
    const fetchMixes = async (): Promise<void> => {
      try {
        const mixesResponse = await fetch(`/api/mixes`);
        if (!mixesResponse.ok) throw new Error("Data fetch failed");
        let mixesData: Mix[] = await mixesResponse.json();

        mixesData = _.orderBy(
          mixesData,
          ["category.code", "listOrder"],
          ["asc", "asc"],
        );

        setMixes(mixesData);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMixes();
  }, []);

  return (
    <>
      {isLoading && <CircularProgress />}
      {mixes?.map((mix: Mix) => <MixRow key={mix.mixcloudKey} mix={mix} />)}
    </>
  );
};

export default MixList;
