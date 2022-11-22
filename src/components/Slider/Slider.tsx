import { memo } from "react";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, DeleteIcon, ItemsGrid } from "@common";

import "swiper/css";
import "swiper/css/pagination";

import { useDeletePhotoMutation } from "../../features/photo/photo";

import styles from "./Slider.module.scss";

export const Slider = memo(({ items }: any) => {
  const [deletePhoto, { isLoading: isDeletingCategory }] =
    useDeletePhotoMutation();

  const deleteHandler = async (item: number | undefined) => {
    if (window.confirm("Delete category?")) {
      await deletePhoto(item!).unwrap();
    }
  };

  return (
    <Swiper
      spaceBetween={30}
      navigation
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation]}
      className="mySwiper"
    >
      {items.map((item: string, { id }: number) => (
        <SwiperSlide key={item}>
          <div className={styles.img}>
            <ItemsGrid data={item} />
            <div className={styles.icon}>
              <Button
                variant="text"
                disabled={isDeletingCategory}
                onClick={() => deleteHandler(id)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") deleteHandler(id);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
