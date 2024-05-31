import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
// import { EffectCreative } from "swiper";

import Container1 from "./Container1";
import Container2 from "./Container2";

const HeroContainer = () => {
  return (
    <div>
      <section>
        <Swiper
          grabCursor={true}
          effect={"creative"}
          creativeEffect={{
            prev: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
            next: {
              shadow: true,
              translate: ["-120%", 0, -500],
            },
          }}
          className="mySwiper5"
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
        >
          <SwiperSlide>
            <Container1 />
          </SwiperSlide>
          <SwiperSlide>
            <Container2 />
          </SwiperSlide>
        </Swiper>
      </section>
    </div>
  );
};

export default HeroContainer;
