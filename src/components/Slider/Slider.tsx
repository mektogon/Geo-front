import { memo } from "react";
import { toast } from "react-toastify";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import { Button, DeleteIcon, ItemsGrid } from "@common";

import "swiper/css";
import "swiper/css/pagination";

import { useDeletePhotoMutation } from "../../features/photo/photo";

import styles from "./Slider.module.scss";

export const Slider: React.FC = memo(({ items }: any) => {
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

  console.log(items, "items");

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
      {items.map((item: any) => (
        <SwiperSlide key={item.id}>
          <div className={styles.img}>
            <ItemsGrid data={item.url} />
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
        </SwiperSlide>
      ))}
    </Swiper>
  );
});
