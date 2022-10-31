import { Card } from "@components";

import { useGetGeographiesQuery } from "../../features/geo/geo";
import { Geo } from "../../features/geo/geo.types";

import styles from "./List.module.scss";

export const List: React.FC = () => {
  const { data, isError, isLoading } = useGetGeographiesQuery();

  if (isLoading) return <p>loading</p>;
  if (isError) return <p>error</p>;

  return (
    <div className={styles.list}>
      {data.map(({ name, id, latitude, longitude }: Geo) => (
        <Card
          key={id}
          name={name}
          id={id}
          latitude={latitude}
          longitude={longitude}
        />
      ))}
    </div>
  );
};
