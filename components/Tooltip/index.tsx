import {
  StyledShareMessage,
  TooltipContainer,
} from "components/Share/StyledShare";
import { useMixcloud } from "contexts/mixcloud";

export const Tooltip: React.FC = () => {
  const {
    session: { tooltipFading, tooltipMessage, tooltipPosition, tooltipVisible },
  } = useMixcloud();

  return (
    <>
      {tooltipMessage && (
        <div
          style={{
            position: "fixed",
            top: tooltipPosition.y,
            left: tooltipPosition.x,
            transform: "translate(-50%, -100%)",
            zIndex: 1000,
          }}
        >
          <TooltipContainer>
            <StyledShareMessage
              $visible={tooltipVisible}
              $fading={tooltipFading}
            >
              {tooltipMessage}
            </StyledShareMessage>
          </TooltipContainer>
        </div>
      )}
    </>
  );
};

export default Tooltip;
