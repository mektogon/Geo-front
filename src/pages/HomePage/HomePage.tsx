import React from "react";

import { List, Search } from "@components";

export const HomePage: React.FC = () => {
  console.log("@");
  return (
    <>
      <Search />
      <List />
    </>
  );
};
