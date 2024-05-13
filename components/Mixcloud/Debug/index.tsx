import type { MixcloudProps } from "components/Mixcloud/types";
import { useMixcloud } from "contexts/mixcloud";

export const Debug: React.FC<MixcloudProps> = () => {
  const {
    collapsed,
    duration,
    loaded,
    mcKey,
    player,
    playing,
    progress,
    scriptLoaded,
    shows,
    showIndex,
    showUnavailable,
  } = useMixcloud();

  return (
    <table>
      <th>
        <td>key</td>
        <td>value</td>
      </th>
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
    </table>
  );
};

export default Debug;
