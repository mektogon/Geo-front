import { ChangeEvent, useCallback } from "react";
import { useSearchParams } from "react-router-dom";

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
  searchTerm?: string | null | undefined;
}

export const List: React.FC<ListProps> = ({ data, isLoading, searchTerm }) => {
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
      {data
        ?.filter(({ name }: any) =>
          name.toLowerCase().includes(searchTerm!.toLowerCase())
        )
        .map(({ name, id, latitude, longitude, photoList, isPlaying }: Geo) => (
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
              isPlaying={isPlaying}
            />
          </div>
        ))}
    </div>
  );
};
