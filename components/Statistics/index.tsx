import {
  StyledStatisticsContainer,
  StyledStatisticsLabel,
  StyledStatisticsList,
  StyledStatisticsListItem,
  StyledStatisticsSection,
  StyledStatisticsSubTitle,
  StyledStatisticsTitle,
  StyledStatisticsValue,
  StyledSummaryList,
} from "components/Statistics/StyledStatistics";
import {
  CategoryMixCount,
  Stats,
  TopTrackCount,
} from "components/Statistics/types";
import { useEffect, useState } from "react";
import { convertTimeToHumanReadable } from "utils/functions";

const Statistics: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async (): Promise<void> => {
      try {
        const response = await fetch("/api/stats");
        if (!response.ok) {
          throw new Error("Failed to fetch stats");
        }
        const data: Stats = await response.json();
        setStats(data);
      } catch (error_) {
        setError((error_ as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!stats) {
    return <div>No data available</div>;
  }

  const renderCategoryMixCounts = (
    categoryMixCounts: CategoryMixCount[],
  ): (false | JSX.Element)[] =>
    categoryMixCounts.map(
      (item) =>
        item.count > 0 && (
          <StyledStatisticsListItem key={item.category}>
            <StyledStatisticsLabel>{item.category}</StyledStatisticsLabel>
            <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
          </StyledStatisticsListItem>
        ),
    );

  const renderTopCounts = (
    topCounts: TopTrackCount[],
    keyName: keyof TopTrackCount,
  ): JSX.Element[] =>
    topCounts.map((item) => (
      <StyledStatisticsListItem key={item[keyName] || item.count}>
        <StyledStatisticsLabel>{item[keyName] as string}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  const renderTopTagCounts = (
    topTagCounts: { tag: string; count: number }[],
  ): JSX.Element[] =>
    topTagCounts.map((item) => (
      <StyledStatisticsListItem key={item.tag}>
        <StyledStatisticsLabel>{item.tag}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  const topTagCountsArray =
    Array.isArray(stats.tagCounts) && stats.tagCounts.length > 0
      ? stats.tagCounts
          .map(({ tag, count }) => ({ tag, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
      : [];

  return (
    <StyledStatisticsContainer>
      <StyledStatisticsTitle>Statistics</StyledStatisticsTitle>
      <StyledStatisticsSection>
        <StyledSummaryList>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Mixes</StyledStatisticsLabel>
            <StyledStatisticsValue>{stats.mixCount}</StyledStatisticsValue>
          </StyledStatisticsListItem>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Tracks</StyledStatisticsLabel>
            <StyledStatisticsValue>{stats.trackCount}</StyledStatisticsValue>
          </StyledStatisticsListItem>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Total Duration</StyledStatisticsLabel>
            <StyledStatisticsValue>
              {convertTimeToHumanReadable(stats.totalDuration)}
            </StyledStatisticsValue>
          </StyledStatisticsListItem>
          <StyledStatisticsListItem>
            <StyledStatisticsLabel>Average Mix</StyledStatisticsLabel>
            <StyledStatisticsValue>
              {convertTimeToHumanReadable(stats.averageMixDuration)}
            </StyledStatisticsValue>
          </StyledStatisticsListItem>
        </StyledSummaryList>
      </StyledStatisticsSection>
      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>Categories</StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderCategoryMixCounts(stats.categoryMixCounts)}
        </StyledStatisticsList>
      </StyledStatisticsSection>
      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>Top 10 Tags</StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopTagCounts(topTagCountsArray)}
        </StyledStatisticsList>
      </StyledStatisticsSection>
      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>Top 10 Artists</StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopCounts(stats.top10ArtistTrackCounts, "artistName")}
        </StyledStatisticsList>
      </StyledStatisticsSection>
      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          Top 10 Remix Artists
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopCounts(
            stats.top10RemixArtistTrackCounts,
            "remixArtistName",
          )}
        </StyledStatisticsList>
      </StyledStatisticsSection>
      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>Top 10 Publishers</StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopCounts(stats.top10PublisherCounts, "publisher")}
        </StyledStatisticsList>
      </StyledStatisticsSection>
    </StyledStatisticsContainer>
  );
};

export default Statistics;
