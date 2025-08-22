import Dx7Lcd from "components/Dx7/Lcd";
import { useMixcloud } from "contexts/mixcloud";
import { useEffect, useState } from "react";

const Dx7CategoryDisplay: React.FC = () => {
  const {
    filters: { categories = [], selectedCategory },
  } = useMixcloud();

  const [displaySelectedCategory, setDisplaySelectedCategory] = useState("");

  useEffect(() => {
    const categoryLookup =
      categories.find((cat) => cat.code === selectedCategory)?.code || "all";

    setDisplaySelectedCategory(categoryLookup.substring(0, 4));
  }, [categories, selectedCategory]);

  return <Dx7Lcd characterCount={4} displayText={displaySelectedCategory} />;
};

export default Dx7CategoryDisplay;
