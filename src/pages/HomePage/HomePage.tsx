import React, { ChangeEvent, useState } from "react";

import { List, Search } from "@components";

import { useSearchGeographyQuery } from "../../features/geo/geo";

export const HomePage: React.FC = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const { data, isLoading } = useSearchGeographyQuery(searchTitle);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTitle(event.target.value);
  };
  return (
    <>
      <Search onChange={onChange} />
      <List data={data} isLoading={isLoading} />
    </>
  );
};
