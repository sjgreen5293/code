"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
  Thumbs,
  FreeMode,
} from "swiper/modules";
import type { SwiperOptions } from "swiper/types";
import type { SwiperRef } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/effect-fade";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "@/styles/scss/2_component/_swiper.scss";

// Swiper 타입 정의
export type SwiperType = "default" | "vertical" | "rolling-v" | "banner" | "rolling";

interface SwiperCmpProps extends SwiperOptions {
  slides: ReactNode[];
  style?: CSSProperties;
  className?: string;
  type?: SwiperType;
  pagination?: {
    el?: string;
    type?: "bullets" | "fraction" | "progressbar" | "custom";
    [key: string]: unknown;
  };
  autoplayActive?: boolean;
  onToggleAutoplay?: () => void;
}

// getConfigByType 함수
function getConfigByType(
  type: SwiperType,
  props: Partial<SwiperCmpProps> & { autoplayActive?: boolean }
): SwiperOptions {
  const { autoplayActive, ...rest } = props;

  switch (type) {
    case "vertical":
      return {
        direction: "vertical",
        slidesPerView: 1,
        autoHeight: true,
        observer: true,
        observeParents: true,
        watchSlidesProgress: true,
        loop: false,
        autoplay: autoplayActive ? rest.autoplay ?? { delay: 5000 } : false,
        ...rest,
      };
    case "rolling-v":
      return {
        direction: "vertical",
        slidesPerView: 1,
        autoHeight: true,
        observer: true,
        observeParents: true,
        loop: true,
        autoplay: props.autoplayActive ? props.autoplay ?? { delay: 5000 } : false,
        ...rest,
      };
    case "banner":
      return {
        loop: true,
        autoplay: autoplayActive ? rest.autoplay ?? { delay: 3000 } : false,

        //pagination: rest.pagination ?? {
        //  clickable: true,
        //  renderBullet: (index, className) =>
        //    `<span class="${className} custom-bullet">
        //  <span class="blind">${index + 1}</span>
        //</span>`,
        //},
        ...rest,
      };
    case "rolling":
      return {
        loop: true,
        autoplay: autoplayActive ? rest.autoplay ?? { delay: 1000 } : false,
        slidesPerView: "auto",
        spaceBetween: 10,
        ...rest,
      };
    default:
      return rest;
  }
}

export default function SwiperCmp(props: SwiperCmpProps) {
  const {
    slides = [],
    style,
    className,
    type = "default",
    pagination,
    autoplayActive = false,
    onToggleAutoplay,
    ...swiperOptions //  Swiper에만 넘길 옵션만 여기에 모음
  } = props;

  const [isClient, setIsClient] = useState(false);
  const swiperRef = useRef<SwiperRef | null>(null);
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!swiperRef.current?.swiper?.autoplay) return;
    if (autoplayActive) {
      swiperRef.current.swiper.autoplay.start();
    } else {
      swiperRef.current.swiper.autoplay.stop();
    }
  }, [autoplayActive]);

  if (!isClient) return null;

  //  vertical 타입일 때: 썸네일 + 메인 구조로 별도 처리
  if (type === "vertical") {
    return (
      <div className={className}>
        {/* 썸네일 Swiper (좌측) */}
        <div className="thumb-outer">
          {/* 이전 버튼 (썸네일 위쪽) */}
          <button className="thumb-btn-prev">▲</button>

          {/* 썸네일 Swiper */}
          <Swiper
            direction="vertical"
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={4}
            freeMode
            watchSlidesProgress
            modules={[FreeMode, Thumbs, Navigation]}
            navigation={{
              prevEl: ".thumb-btn-prev",
              nextEl: ".thumb-btn-next",
            }}
            style={{ height: "100%" }}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={`thumb-${idx}`}>
                <button
                  type="button"
                  className="btn-slide"
                  onClick={() => {
                    swiperRef.current?.swiper.slideTo(idx);
                  }}
                >
                  {slide}
                </button>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 다음 버튼 (썸네일 아래쪽) */}
          <button className="thumb-btn-next">▼</button>
        </div>

        {/* 메인 Swiper (우측) */}
        <div className="main-thumb-wrapper">
          {/* 이전 버튼 */}
          <button className="main-thumb-prev">←</button>

          <Swiper
            ref={swiperRef}
            modules={[Thumbs, EffectFade, Autoplay, Navigation]}
            thumbs={{ swiper: thumbsSwiper }}
            effect={swiperOptions.effect ?? "slide"}
            loop={swiperOptions.loop ?? false}
            autoplay={autoplayActive ? swiperOptions.autoplay ?? { delay: 5000 } : false}
            navigation={{
              prevEl: ".main-thumb-prev",
              nextEl: ".main-thumb-next",
            }}
            style={{ width: 400, height: 400 }}
          >
            {slides.map((slide, idx) => (
              <SwiperSlide key={`main-${idx}`}>{slide}</SwiperSlide>
            ))}
          </Swiper>

          {/* 다음 버튼 */}
          <button className="main-thumb-next">→</button>
        </div>
      </div>
    );
  }

  //  기타 타입 (getConfigByType로 처리)
  const config: SwiperOptions = getConfigByType(type, {
    ...swiperOptions,
    autoplayActive, //  여기서만 직접 전달
  });

  return (
    <div className={className} style={{ position: "relative" }}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
        ref={swiperRef}
        pagination={pagination}
        navigation={swiperOptions.navigation}
        style={style}
        {...config}
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>{slide}</SwiperSlide>
        ))}
      </Swiper>

      {type === "banner" && onToggleAutoplay && (
        <div className="btn-bottom">
          {pagination?.el === ".banner-fraction" && pagination?.type === "fraction" && (
            <div className="banner-fraction"></div>
          )}

          <button
            type="button"
            onClick={onToggleAutoplay}
            className={`btn-swiper ${autoplayActive ? "btn-stop" : "btn-start"}`}
          >
            <span className="blind">{autoplayActive ? "⏸ 중지" : "▶ 시작"}</span>
          </button>
        </div>
      )}
    </div>
  );
}
