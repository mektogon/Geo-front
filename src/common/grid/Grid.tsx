import { LoadableImage } from "@common";

export interface IItemsGrid {
  data: string;
}

export const ItemsGrid = ({ data }: IItemsGrid) => <LoadableImage src={data} />;
