import React from "react";

import { Search, List } from "@components";

export const Home: React.FC = () => {
  console.log("@");
  return (
    <>
      <Search />
      <List />
    </>
  );
};
