import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./Slider.module.scss";
import { ItemsGrid } from "@common";

export const Slider = ({ items }: any) => (
  <Swiper
    spaceBetween={30}
    navigation
    pagination={{
      clickable: true,
    }}
    modules={[Pagination, Navigation]}
    className="mySwiper"
  >
    {items.map((item: string) => (
      <SwiperSlide key={item}>
        <div className={styles.img}>
          <ItemsGrid data={item} />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
