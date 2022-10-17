import React from "react";

import { List,Search } from "@components";

export const Home: React.FC = () => {
  console.log("@");
  return (
    <>
      <Search />
      <List />
    </>
  );
};
