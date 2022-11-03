import { Card } from "@components";

import { useGetGeographiesQuery } from "../../features/geo/geo";
import { Geo } from "../../features/geo/geo.types";

import styles from "./List.module.scss";

export const List = () => {
  const { data: geo, isError, isLoading } = useGetGeographiesQuery({});

  if (isLoading) return <p>loading</p>;
  if (isError) return <p>error</p>;

  console.log(geo, "geo");

  return (
    <div className={styles.list}>
      {geo?.map(({ name, id, latitude, longitude, photoList }: Geo) => (
        <Card
          key={id}
          name={name}
          id={id}
          latitude={latitude}
          photoList={photoList}
          longitude={longitude}
        />
      ))}
    </div>
  );
};
