import Image from "next/image";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import styles from "./index.module.css";

const images = [
  "/img01.jpg",
  "/img02.jpg",
  "/img03.jpg",
  "/img04.jpg",
  "/img05.jpg",
  "/img06.jpg",
  "/IMG_3685.jpg",

];

const BasicSlider: React.FC = () => {
  const slideSettings = {
    0: {
      slidesPerView: 1.4,
      spaceBetween: 2,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 2,
    },
  };

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      breakpoints={slideSettings} // slidesPerViewを指定
      slidesPerView={"auto"} // ハイドレーションエラー対策
      centeredSlides={true}// スライドを中央に配置
      loop={true}// スライドをループさせる
      speed={1000} // スライドが切り替わる時の速度
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}// スライド表示時間
      pagination={{
        clickable: true,
      }}// ページネーション, クリックで対象のスライドに切り替わる
      className={styles.slideWrapper}
    >
      {images.map((src: string, index: number) => (
        <SwiperSlide key={index}>
          <Image
            src={src}
            width={1000}
            height={523}
            alt="Slider Image"
            sizes="(min-width: 1024px) 100vw, 60vw"
            loading="eager"
            className={styles.slideImage}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default BasicSlider;