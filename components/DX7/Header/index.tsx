import {
  StyledDx7Header,
  StyledDx7HeaderLogo,
  StyledDx7HeaderMotto,
  StyledDx7HeaderSpacer,
  StyledDx7HeaderTitle,
} from "./StyledDx7Header";

const Dx7Header: React.FC = () => {
  return (
    <StyledDx7Header>
      <StyledDx7HeaderTitle>Yeeha</StyledDx7HeaderTitle>
      <StyledDx7HeaderLogo />
      <StyledDx7HeaderMotto>
        Funky House Coming In Your Ears
      </StyledDx7HeaderMotto>
      <StyledDx7HeaderSpacer />
    </StyledDx7Header>
  );
};

export default Dx7Header;
