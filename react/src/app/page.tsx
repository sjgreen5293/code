"use client";

//import Image from "next/image";
import { useState } from "react";
import MainLayout from "@/layouts/MainLayout";
import SwiperCmp from "@/components/common/Swiper";
import Item from "@/components/common/Item";
import { Link, Button, Box, Tabs, Tab } from "@mui/material";
import "@/styles/scss/3_pages/main.scss";

// TabPanelProps 타입 정의
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  className?: string;
}

// TabPanel 컴포넌트
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

// 메인 배너 리스트
const bannerImageList = [
  {
    src: "/images/@temp/@main_banner_01.jpg",
    alt: "배너 1",
    title: "Gift for your skin",
    text: "Aliquip fugiat ipsum nostrud ex et eu incididunt \nquis minim dolore excepteur voluptate",
    btn: "Shop Now",
    link: "/event/1",
    isPopup: false,
  },
  {
    src: "/images/@temp/@temp_banner_02.jpg",
    alt: "배너 2",
    title: "Gift for your skin2",
    text: "Aliquip fugiat ipsum nostrud ex et eu incididunt \nquis minim dolore excepteur voluptate",
    btn: "Shop Now",
    link: "/event/1",
    isPopup: false,
  },
  {
    src: "/images/@temp/@temp_banner_01.jpg",
    alt: "배너 3",
    title: "Gift for your skin3",
    text: "Aliquip fugiat ipsum nostrud ex et eu incididunt \nquis minim dolore excepteur voluptate",
    btn: "Shop Now",
    link: "/event/1",
    isPopup: false,
  },
];

// 상품 리스트
const items = [
  {
    type: "Best-seller",
    name: "Product title",
    desc: "Deserunt non fugiat aute cons",
    price: "$32",
    originalPrice: "$42",
    image: "/images/@temp/@item_01.png",
    link: "/product/1",
  },
  {
    type: "Best-seller",
    name: "Another product2",
    desc: "Lorem ipsum dolor sit amet",
    price: "$25",
    originalPrice: "$30",
    image: "/images/@temp/@item_02.png",
    link: "/product/2",
  },
  {
    type: "Best-seller",
    name: "Another product3",
    desc: "Lorem ipsum dolor sit amet",
    price: "$25",
    originalPrice: "$30",
    image: "/images/@temp/@item_03.png",
    link: "/product/3",
  },
  {
    type: "Best-seller",
    name: "Another product4",
    desc: "Lorem ipsum dolor sit amet",
    price: "$25",
    originalPrice: "$30",
    image: "/images/@temp/@item_04.png",
    link: "/product/4",
  },
];

// 프로모션 리스트
const promotionList = [
  {
    src: "/images/@temp/@temp_banner_01.jpg",
    alt: "배너 1",
    title: "Relaxing & \nPampering",
    text: "Pariatur ad nisi ex tempor ea",
    btn: "Explore",
    link: "",
    isPopup: false,
  },
  {
    src: "/images/@temp/@temp_banner_02.jpg",
    alt: "배너 2",
    title: "Smooth &\nBright Skin",
    text: "Pariatur ad nisi ex tempor ea",
    btn: "Explore",
    link: "",
    isPopup: false,
  },
  {
    src: "/images/@temp/@temp_banner_01.jpg",
    alt: "배너 3",
    title: "Relaxing & \nPampering",
    text: "Pariatur ad nisi ex tempor ea",
    btn: "Explore",
    link: "",
    isPopup: false,
  },
  {
    src: "/images/@temp/@temp_banner_02.jpg",
    alt: "배너 4",
    title: "Smooth &\nBright Skin",
    text: "Pariatur ad nisi ex tempor ea",
    btn: "Explore",
    link: "",
    isPopup: false,
  },
];

// whatsnew 리스트
const whatsnewList = [
  {
    src: "/images/@temp/@whatsnew_01.jpg",
    alt: "배너 1",
    title: "Anim sint Lorem excepteur commodo ",
    date: "Oct 12, 2022",
    link: "",
    isPopup: false,
  },
  {
    src: "/images/@temp/@whatsnew_02.jpg",
    alt: "배너 2",
    title: "Smooth &\nBright Skin",
    date: "Oct 12, 2022",
    link: "",
    isPopup: false,
  },
  {
    src: "/images/@temp/@whatsnew_01.jpg",
    alt: "배너 3",
    title: "Relaxing & \nPampering",
    date: "Oct 12, 2022",
    link: "",
    isPopup: false,
  },
  {
    src: "/images/@temp/@whatsnew_02.jpg",
    alt: "배너 4",
    title: "Smooth &\nBright Skin",
    date: "Oct 12, 2022",
    link: "",
    isPopup: false,
  },
];

// instagram
const instagramList = [
  {
    src: "/images/@temp/@instagram_01.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_02.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_03.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_04.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_05.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_06.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_07.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_08.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_09.jpg",
    alt: "이미지 1",
  },
  {
    src: "/images/@temp/@instagram_10.jpg",
    alt: "이미지 10",
  },
  {
    src: "/images/@temp/@instagram_11.jpg",
    alt: "이미지 11",
  },
  {
    src: "/images/@temp/@instagram_12.jpg",
    alt: "이미지 11",
  },
];

export default function Home() {
  // 배너 자동재생 상태
  const [bannerAutoplay1, setBannerAutoplay1] = useState(true);
  const [bannerAutoplay2] = useState(true);

  // 탭 상태
  const [value, setValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <MainLayout>
      <div className="main">
        {/* Main Banner */}
        <section className="section-banner">
          <h2 className="blind">Main Banner</h2>
          <SwiperCmp
            type="banner"
            className="type-main"
            autoplayActive={bannerAutoplay1}
            pagination={{ el: ".banner-fraction", type: "fraction" }}
            onToggleAutoplay={() => setBannerAutoplay1((prev) => !prev)}
            effect="slide"
            slides={bannerImageList.map((item, idx) => (
              <Link href={item.link} key={idx} className="slide-inner">
                <img src={item.src} alt={item.alt} />
                <div className="desc-area">
                  <dl className="txt-area">
                    <dt className="title">{item.title}</dt>
                    <dd className="txt">{item.text}</dd>
                  </dl>
                  <Button type="submit" className="btn-md btn-type1 ">
                    {item.btn}
                  </Button>
                </div>
              </Link>
            ))}
          />
        </section>

        {/* Our Products */}
        <section className="section-com section-product">
          <div className="title-area type-cener">
            <h2 className="title-2">Our products</h2>
          </div>
          <Box className="tab-wrap mt30">
            <Tabs
              value={value}
              onChange={handleChange}
              centered
              aria-label="disabled tabs example"
              className="tab-type1 w150 pb40"
            >
              <Tab label="Best-sellers" className="label" />
              <Tab label="New products" className="label" />
            </Tabs>
            {/* Tab 1 */}
            <TabPanel value={value} index={0} className="item-wrap item-col4">
              {items.map((item, idx) => (
                <Item key={idx} item={item} />
              ))}
            </TabPanel>
            {/* Tab 2 */}
            <TabPanel value={value} index={1} className="item-wrap">
              Tab Two Content
            </TabPanel>
          </Box>
        </section>

        {/* Event promotion */}
        <section className="section-com section-promotion">
          <div className="title-area type-cener mb40">
            <h2 className="title-2">Event promotion</h2>
            <Link href="" className="link-all">
              See all
            </Link>
          </div>
          <div className="swiper-wrap">
            <SwiperCmp
              type="banner"
              className="type-banner"
              spaceBetween={16}
              slidesPerView={2}
              navigation={{
                prevEl: ".swiper-btn-prev",
                nextEl: ".swiper-btn-next",
                enabled: true,
                hideOnClick: false,
              }}
              autoplayActive={bannerAutoplay2}
              //onToggleAutoplay={() => setBannerAutoplay2((prev) => !prev)}
              effect="slide"
              slides={promotionList.map((item, idx) => (
                <div key={idx} className="slide-inner">
                  <Link href={item.link} className="link"></Link>
                  <span className="img-area">
                    <img src={item.src} alt={item.alt} />
                  </span>
                  <div className="desc-area">
                    <dl className="txt-area">
                      <dt className="title">{item.title}</dt>
                      <dd className="txt">{item.text}</dd>
                    </dl>
                    <Button type="button" className="btn-md btn-type1">
                      {item.btn}
                    </Button>
                  </div>
                </div>
              ))}
            />
            <div className="swiper-btn-wrap">
              <Button className="swiper-btn swiper-btn-prev">
                <span className="blind">Prev</span>
              </Button>
              <Button className="swiper-btn swiper-btn-next">
                <span className="blind">Next</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Read what’s new */}
        <section className="section-com section-whatsnew">
          <div className="title-area">
            <h2 className="title-2 text-left">Read what’s new</h2>
            <p className="desc">
              Sint consequat in ipsum irure adipisicing dolore
              <br />
              culpa incididunt. Veniam elit magna anim ipsum
              <br />
              eiusmod eu
            </p>
            <Button type="button" className="btn-type2 btn-md">
              Explore more
            </Button>
          </div>
          <div className="swiper-wrap">
            <SwiperCmp
              type="banner"
              className="type-card "
              spaceBetween={24}
              slidesPerView={2}
              navigation={{
                prevEl: ".card-btn-prev",
                nextEl: ".card-btn-next",
                enabled: true,
                hideOnClick: false,
              }}
              //autoplayActive={bannerAutoplay2}
              //onToggleAutoplay={() => setBannerAutoplay2((prev) => !prev)}
              effect="slide"
              slides={whatsnewList.map((item, idx) => (
                <div key={idx} className="slide-inner">
                  <Link href={item.link} className="link"></Link>
                  <div className="img-area">
                    <img src={item.src} alt={item.alt} />
                  </div>
                  <div className="desc-area">
                    <b className="title">{item.title}</b>
                    <div className="date">{item.date}</div>
                  </div>
                </div>
              ))}
            />
            <div className="card-btn-wrap">
              <Button className="card-btn card-btn-prev">
                <span className="blind">Prev</span>
              </Button>
              <Button className="card-btn card-btn-next">
                <span className="blind">Next</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Instagram */}
        <section className="section-com section-instagram">
          <div className="title-area type-center">
            <h2 className="title-2">Instagram</h2>
            <p className="desc">@yourinstagram_offical</p>
          </div>
          <ul className="list-instagram">
            {instagramList.map((item, idx) => (
              <li key={idx}>
                <img src={item.src} alt={item.alt} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </MainLayout>
  );
}
