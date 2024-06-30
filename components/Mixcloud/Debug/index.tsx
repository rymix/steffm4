import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";

export const Debug: React.FC<MixcloudProps> = () => {
  const {
    mcKey,
    mix: {
      duration,
      progress: mixProgress,
      progressPercent: mixProgressPercent,
    },
    filters: { selectedCategory },
    track: {
      progress: trackProgress,
      progressPercent: trackProgressPercent,
      sectionNumber: trackSectionNumber,
    },
    widget: { loaded, playing, scriptLoaded, volume },
  } = useMixcloud();

  return (
    <table>
      <thead>
        <tr>
          <th>key</th>
          <th>value</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>duration</td>
          <td>{duration}</td>
        </tr>
        <tr>
          <td>loaded</td>
          <td>{loaded ? "true" : "false"}</td>
        </tr>
        <tr>
          <td>mcKey</td>
          <td>{mcKey}</td>
        </tr>
        <tr>
          <td>playing</td>
          <td>{playing ? "true" : "false"}</td>
        </tr>
        <tr>
          <td>mixProgress</td>
          <td>{mixProgress}</td>
        </tr>
        <tr>
          <td>mixProgressPercent</td>
          <td>{mixProgressPercent}</td>
        </tr>
        <tr>
          <td>trackProgress</td>
          <td>{trackProgress}</td>
        </tr>
        <tr>
          <td>trackProgressPercent</td>
          <td>{trackProgressPercent}</td>
        </tr>
        <tr>
          <td>trackSectionNumber</td>
          <td>{trackSectionNumber}</td>
        </tr>
        <tr>
          <td>scriptLoaded</td>
          <td>{scriptLoaded ? "true" : "false"}</td>
        </tr>
        <tr>
          <td>volume</td>
          <td>{volume}</td>
        </tr>
        <tr>
          <td>selectedCategory</td>
          <td>{selectedCategory}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Debug;
