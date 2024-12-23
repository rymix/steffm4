import ArrowDropDown from "@mui/icons-material/ArrowDropDown";
import ArrowDropUp from "@mui/icons-material/ArrowDropUp";
import styled from "styled-components";

export const StyledStatisticsContainer = styled.div`
  padding: 20px;
`;

export const StyledStatisticsSection = styled.div`
  margin-bottom: 20px;
`;

export const StyledStatisticsTitle = styled.h2`
  margin-bottom: 10px;
`;

export const StyledStatisticsSubTitle = styled.h3`
  margin-bottom: 10px;
`;

export const StyledStatisticsList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const StyledStatisticsListItem = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5px;
`;

export const StyledStatisticsLabel = styled.span`
  width: 50%;
  text-align: right;
  padding-right: 10px;
  box-sizing: border-box;
`;

export const StyledStatisticsValue = styled.span`
  width: 50%;
  text-align: left;
  padding-left: 10px;
  box-sizing: border-box;
`;

export const StyledSummaryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

export const StyledShowHideBlock = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: center;
  color: grey;
  cursor: pointer;
  margin-top: 16px;
  transition: color 0.3s ease;

  &:hover {
    color: black;
  }
`;

export const StyledArrowDropUp = styled(ArrowDropUp)``;

export const StyledArrowDropDown = styled(ArrowDropDown)``;
