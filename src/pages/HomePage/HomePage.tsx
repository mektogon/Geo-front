import React from "react";
import { useSearchParams } from "react-router-dom";

import { Spinner } from "@common";
import { List, Search } from "@components";

import { useGetGeographiesQuery } from "../../features/geo/geo";

export const HomePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get("name") || "";

  const { data, isLoading } = useGetGeographiesQuery({});

  if (isLoading) return <Spinner />;

  const handleSearch = (event: any) => {
    const name = event.target.value;

    if (name) {
      setSearchParams({ name });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div>
      <Search isActive onChange={handleSearch} />
      <List data={data} isLoading={isLoading} searchTerm={searchTerm} />
    </div>
  );
};
