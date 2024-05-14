import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";

export const Debug: React.FC<MixcloudProps> = () => {
  const {
    collapsed,
    duration,
    loaded,
    mcKey,
    playing,
    progress,
    scriptLoaded,
    showUnavailable,
    volume,
    volumeIndex,
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
          <td>collapsed</td>
          <td>{collapsed ? "true" : "false"}</td>
        </tr>
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
          <td>progress</td>
          <td>{progress}</td>
        </tr>
        <tr>
          <td>scriptLoaded</td>
          <td>{scriptLoaded ? "true" : "false"}</td>
        </tr>
        <tr>
          <td>showUnavailable</td>
          <td>{showUnavailable ? "true" : "false"}</td>
        </tr>
        <tr>
          <td>volume</td>
          <td>{volume}</td>
        </tr>
        <tr>
          <td>volumeIndex</td>
          <td>{volumeIndex}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default Debug;
