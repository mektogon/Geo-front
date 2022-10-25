import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import styles from "./Slider.module.scss";

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
          <img src={item} alt={item} />
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
);
