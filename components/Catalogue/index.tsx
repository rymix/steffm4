/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
import {
  StyledCategories,
  StyledFilters,
  StyledMixList,
  StyledTags,
} from "components/Catalogue/StyledCatalogue";
import type { CatalogueProps, Category, Tag } from "components/Catalogue/types";
import { useMixcloud } from "contexts/mixcloud";
import type { Mix } from "db/types";
import { useEffect, useState } from "react";

export const Catalogue: React.FC<CatalogueProps> = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mixes, setMixes] = useState<Mix[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedTag, setSelectedTag] = useState("");

  const { handleLoad } = useMixcloud();

  useEffect(() => {
    const fetchCategoriesAndTags = async (): Promise<void> => {
      try {
        const catResponse = await fetch("/api/categories");
        const tagsResponse = await fetch("/api/tags");
        if (!catResponse.ok || !tagsResponse.ok)
          throw new Error("Data fetch failed");

        const categoriesData = await catResponse.json();
        const tagsData = await tagsResponse.json();

        setCategories([{ code: "", name: "All" }, ...categoriesData]);
        setTags(["All", ...tagsData]);
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchCategoriesAndTags();
  }, []);

  useEffect(() => {
    const fetchMixes = async (): Promise<void> => {
      try {
        const queryParams = [];

        if (selectedCategory) {
          queryParams.push(`category=${selectedCategory}`);
        }

        if (selectedTag) {
          queryParams.push(`tags=${selectedTag}`);
        }

        const queryString =
          queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

        const mixesResponse = await fetch(`/api/mixes${queryString}`);

        if (!mixesResponse.ok) throw new Error("Data fetch failed");

        const mixesData = await mixesResponse.json();

        setMixes(mixesData);
      } catch (error) {
        console.error(error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchMixes();
  }, [selectedCategory, selectedTag]);

  const handleCategoryClick = (code: string): void => {
    setSelectedCategory(code);
  };

  const handleTagClick = (tag: string): void => {
    setSelectedTag(tag === "All" ? "" : tag);
  };

  return (
    <>
      <StyledFilters>
        <StyledCategories>
          <h2>Selected Category: {selectedCategory}</h2>
          <ul>
            {categories?.map((category) => {
              return (
                <li
                  key={category.code}
                  onClick={() => handleCategoryClick(category.code)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleCategoryClick(category.code);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  {category.name}
                </li>
              );
            })}
          </ul>
        </StyledCategories>
        <StyledTags>
          <h2>Selected Tags: {selectedTag}</h2>
          <ul>
            {tags?.map((tag) => {
              return (
                <li
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleTagClick(tag);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  #{tag}
                </li>
              );
            })}
          </ul>
        </StyledTags>
        <StyledMixList>
          <h2>Mixes</h2>
          <ul>
            {mixes?.map((mix) => {
              return (
                <li
                  key={mix.mixcloudKey}
                  onClick={() => handleLoad(mix.mixcloudKey)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      handleLoad(mix.mixcloudKey);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                >
                  {mix.mixcloudKey}
                </li>
              );
            })}
          </ul>
        </StyledMixList>
      </StyledFilters>
    </>
  );
};

export default Catalogue;
