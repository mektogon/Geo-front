import React from "react";

import { Categories, Search } from "@components";

export const CategoryPage: React.FC = () => {
  console.log("@");

  return (
    <>
      <Search />
      <Categories />
    </>
  );
};
