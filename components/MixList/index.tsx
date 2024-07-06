import { CircularProgress } from "@mui/material";
import MixRow from "components/MixList/MixRow";
import type { Mix } from "db/types";
import React, { useEffect, useState } from "react";

export const MixList: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [mixes, setMixes] = useState([]);

  useEffect(() => {
    const fetchMixes = async (): Promise<void> => {
      try {
        const mixesResponse = await fetch(`/api/mixes`);
        if (!mixesResponse.ok) throw new Error("Data fetch failed");
        let mixesData = await mixesResponse.json();
        mixesData = mixesData.sort((a, b) => a.name.localeCompare(b.name));
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
