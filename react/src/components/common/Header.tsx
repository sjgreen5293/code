"use client";

import React, { useState } from "react";
import Link from "next/link";
//import Image from "next/image";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Popover from "@/components/common/Popover";
import { SearchRounded, ShoppingCartOutlined, Login } from "@mui/icons-material";
import styles from "@/styles/scss/1_layout/Header.module.scss";

interface UtilLinkItem {
  name: string;
  href: string;
  class: string;
  icon: React.ReactElement;
  login?: boolean; // 로그인 여부 표시용 옵셔널 속성
}

const navlLink = [
  { name: "Shop", href: "/" },
  { name: "Offers", href: "/" },
  { name: "Our story", href: "/" },
  { name: "Blog", href: "/" },
];

//
const utilLink: UtilLinkItem[] = [
  { name: "cart", href: "/", class: "ico-cart", icon: <ShoppingCartOutlined /> },
  { name: "login", href: "/", class: "ico-login", icon: <Login /> },
];

const loginLink = [
  { name: "Sign in", href: "/" },
  { name: "Join Now", href: "/" },
];

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <h1 className={styles["logo-area"]}>
          {/*<Image src="/images/common/logo_pureskin.svg" alt="로고" width={100} height={50} />*/}
          <Link href="" className={styles.logo}>
            <span className="blind">Pure Skin</span>
          </Link>
        </h1>
        <nav>
          <ul className={`${styles["nav-link"]}`}>
            {navlLink.map((item) => (
              <li key={item.name}>
                <Link href={item.href} className={styles.link}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles["util-area"]}>
          <div className={styles["search-area"]}>
            <TextField
              placeholder="Search product..."
              className="type-2"
              defaultValue=""
              size="small"
              slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton type="submit" className="btn-ico btn-search">
                        <SearchRounded />
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
          </div>
          <ul className={styles["util-member"]}>
            {utilLink.map((item) => (
              <li key={item.name} className={item.class}>
                <Link
                  href={item.href}
                  onClick={(e) => {
                    // 로그인 prop이 없고, item.name이 'cart'일 때
                    if (!item.login && item.name === "cart") {
                      e.preventDefault();
                      window.location.href = "/your-cart-link";
                    } else if (item.name === "login") {
                      handleClick(e);
                    }
                  }}
                >
                  {item.icon}
                  <span className="blind">{item.name}</span>
                </Link>

                {item.name === "login" && (
                  <Popover
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    popoverClassName="popover-type1"
                  >
                    <ul>
                      {loginLink.map((item) => (
                        <li key={item.name}>
                          <Link href={item.href}>{item.name}</Link>
                        </li>
                      ))}
                    </ul>
                  </Popover>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
