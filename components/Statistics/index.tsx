import {
  StyledArrowDropDown,
  StyledArrowDropUp,
  StyledShowHideBlock,
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
  TopTagCount,
  TopTrackCount,
} from "components/Statistics/types";
import { JSX, useEffect, useState } from "react";
import { convertTimeToHumanReadable } from "utils/functions";

const Statistics: React.FC = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showAllTags, setShowAllTags] = useState<boolean>(false);
  const [showAllArtists, setShowAllArtists] = useState<boolean>(false);
  const [showAllRemixArtists, setShowAllRemixArtists] =
    useState<boolean>(false);
  const [showAllPublishers, setShowAllPublishers] = useState<boolean>(false);

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

  const renderTopTagCounts = (topTagCounts: TopTagCount[]): JSX.Element[] =>
    topTagCounts.map((item) => (
      <StyledStatisticsListItem key={item.tag}>
        <StyledStatisticsLabel>{item.tag}</StyledStatisticsLabel>
        <StyledStatisticsValue>{item.count}</StyledStatisticsValue>
      </StyledStatisticsListItem>
    ));

  const topTagCountsArray = stats.top10TagCounts
    .map(({ tag, count }) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const allTagCountsArray = stats.tagCounts
    .map(({ tag, count }) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);

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
        <StyledStatisticsSubTitle>
          {showAllTags ? "All Tags" : "Top 10 Tags"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopTagCounts(
            showAllTags ? allTagCountsArray : topTagCountsArray,
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock onClick={() => setShowAllTags(!showAllTags)}>
          {showAllTags ? (
            <>
              Reduce to top 10 tags <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all tags <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllArtists ? "All Artists" : "Top 10 Artists"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopCounts(
            showAllArtists
              ? stats.artistTrackCounts
              : stats.top10ArtistTrackCounts,
            "artistName",
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock onClick={() => setShowAllArtists(!showAllArtists)}>
          {showAllArtists ? (
            <>
              Reduce to top 10 artists <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all artists <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllRemixArtists ? "All Remix Artists" : "Top 10 Remix Artists"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopCounts(
            showAllRemixArtists
              ? stats.remixArtistTrackCounts
              : stats.top10RemixArtistTrackCounts,
            "remixArtistName",
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock
          onClick={() => setShowAllRemixArtists(!showAllRemixArtists)}
        >
          {showAllRemixArtists ? (
            <>
              Reduce to top 10 remix artists <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all remix artists <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>

      <StyledStatisticsSection>
        <StyledStatisticsSubTitle>
          {showAllPublishers ? " All Publishers" : "Top 10 Publishers"}
        </StyledStatisticsSubTitle>
        <StyledStatisticsList>
          {renderTopCounts(
            showAllPublishers
              ? stats.publisherCounts
              : stats.top10PublisherCounts,
            "publisher",
          )}
        </StyledStatisticsList>
        <StyledShowHideBlock
          onClick={() => setShowAllPublishers(!showAllPublishers)}
        >
          {showAllPublishers ? (
            <>
              Reduce to top 10 publishers <StyledArrowDropUp />
            </>
          ) : (
            <>
              Show all publishers <StyledArrowDropDown />
            </>
          )}
        </StyledShowHideBlock>
      </StyledStatisticsSection>
    </StyledStatisticsContainer>
  );
};
export default Statistics;
