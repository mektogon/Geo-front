import { useCallback } from "react";

import { Card } from "@components";

import { usePrefetch } from "../../features/geo/geo";
import { Geo } from "../../features/geo/geo.types";

import styles from "./List.module.scss";

type Item = {
  id?: number;
  name?: string;
  type?: string;
  latitude?: string;
  longitude?: string;
  description?: string;
};

interface ListProps {
  data: Item[] | undefined;
  isLoading: boolean;
}

export const List: React.FC<ListProps> = ({ data, isLoading }) => {
  if (isLoading) return <p>loading</p>;
  const prefetchPage = usePrefetch("getGeography");

  const prefetchNext = useCallback(
    (id: any) => {
      prefetchPage(id);
    },
    [prefetchPage]
  );

  return (
    <div className={styles.list}>
      {data?.map(({ name, id, latitude, longitude, photoList }: Geo) => (
        <div onMouseMove={() => prefetchNext(id)} className={styles.item}>
          <Card
            key={id}
            name={name}
            id={id}
            latitude={latitude}
            photoList={photoList}
            longitude={longitude}
          />
        </div>
      ))}
    </div>
  );
};
