import { useCallback } from "react";

import { Spinner } from "@common";
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
  const prefetchPage = usePrefetch("getGeography");

  const prefetchNext = useCallback(
    (id: any) => {
      prefetchPage(id);
    },
    [prefetchPage]
  );

  if (isLoading) return <Spinner />;
  return (
    <div className={styles.list}>
      {data?.map(({ name, id, latitude, longitude, photoList }: Geo) => (
        <div
          onMouseMove={() => prefetchNext(id)}
          className={styles.item}
          key={id}
        >
          <Card
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
