import React, { memo } from "react";
import ReactPlayer from "react-player";
import { toast } from "react-toastify";
import { Lazy, Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, DeleteIcon, ItemsGrid } from "@common";

import "swiper/css";
import "swiper/css/pagination";

import { useDeletePhotoMutation } from "../../features/photo/photo";

import styles from "./Slider.module.scss";

type Items = {
  id: string;
  url: string;
};

interface SliderProps {
  items: Items[] | any;
  video?: Items[] | any;
  lastIdx?: any;
}

export const Slider = memo(({ items, video, lastIdx }: SliderProps) => {
  const [deletePhoto, { isLoading: isDeletingCategory }] =
    useDeletePhotoMutation();

  const deleteHandler = async (item: number | undefined) => {
    if (window.confirm("Delete photo?")) {
      await deletePhoto(item!)
        .unwrap()
        .then((payload: any) => {
          toast.success("Succeeded", payload);
          window.location.reload();
        })
        .catch((data) => toast.error(data.status));
    }
  };

  return (
    <Swiper
      spaceBetween={30}
      navigation
      lazy
      pagination={{
        clickable: true,
      }}
      modules={[Pagination, Navigation, Lazy]}
      className="mySwiper"
    >
      {items?.map((item: any) => (
        <SwiperSlide key={item.id}>
          <div className={styles.img}>
            <img src={item.url} alt="" className="swiper-lazy" />
            <div className="swiper-lazy-preloader swiper-lazy-preloader-black" />

            <div className={styles.icon}>
              <Button
                variant="text"
                disabled={isDeletingCategory}
                onClick={() => deleteHandler(item.id)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") deleteHandler(item.id);
                }}
              >
                <DeleteIcon />
              </Button>
            </div>
          </div>
          {/* {video && <ReactPlayer url={video[0].url} controls />} */}
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
