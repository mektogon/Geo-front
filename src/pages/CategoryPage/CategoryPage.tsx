import React from "react";
import { useSearchParams } from "react-router-dom";

import { Categories, Search } from "@components";

export const CategoryPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("name") || "";

  const handleSearch = (event: any) => {
    const name = event.target.value;

    if (name) {
      setSearchParams({ name });
    } else {
      setSearchParams({});
    }
  };
  return (
    <>
      <Search onChange={handleSearch} />
      <Categories searchTerm={searchTerm} />
    </>
  );
};
