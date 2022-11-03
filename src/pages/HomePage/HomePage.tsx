import React, { ChangeEvent, useState } from "react";

import { List, Search } from "@components";

import { useSearchGeographyQuery } from "../../features/geo/geo";

export const HomePage: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const { data, isLoading } = useSearchGeographyQuery(searchTitle);

  const handleChange = (event: any) => {
    setSearchTitle(event.target.value);
  };
  return (
    <>
      <Search onChange={handleChange} />
      <List data={data} isLoading={isLoading} />
    </>
  );
};
