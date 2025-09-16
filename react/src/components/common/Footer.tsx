"use client";

import React from "react";
import Link from "next/link";
import SelectBox from "@/components/common/Select";
import { TextField, Button } from "@mui/material";
import { Twitter, Facebook, LinkedIn, YouTube } from "@mui/icons-material";
import styles from "@/styles/scss/1_layout/Footer.module.scss";

const Footer = () => {
  const [selected, setSelected] = React.useState(menu.links[0].id);

  // menu.links -> options 변환
  const options = menu.links.map((link) => ({
    label: link.text,
    value: link.id,
  }));

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles["footer-menu"]}>
          <ul className={styles["footer-list"]}>
            {menuData.map((menu, i) => (
              <li key={i}>
                <h3 className={`title-3 ${styles["title"]}`}>
                  <Link href="#" className={styles.link}>
                    {menu.title}
                  </Link>
                </h3>

                {menu.title === "Contact" ? (
                  <dl className={styles["fnb-list"]}>
                    <dt>Phone:</dt>
                    <dd>(+1) 123 456 7893</dd>
                    <dt>Email:</dt>
                    <dd>name@email.com</dd>
                  </dl>
                ) : (
                  <>
                    {Array.isArray(menu.links) && menu.links.length > 0 && (
                      <>
                        <ul className={styles["fnb-list"]}>
                          {menu.links.map((link, j) => (
                            <li key={j}>
                              <Link href="#" className={styles.link}>
                                {link}
                              </Link>
                            </li>
                          ))}
                        </ul>

                        {menu.title === "About" && (
                          //<select className={styles.select}>
                          //  {menu.links.map((link, j) => (
                          //    <option key={j} value={link}>
                          //      {link}
                          //    </option>
                          //  ))}
                          //</select>
                          <div className={styles["language-area"]}>
                            <SelectBox
                              className="select-box"
                              label="About Options"
                              value={selected}
                              options={options}
                              onChange={setSelected}
                              fullWidth={false}
                              minWidth={128}
                              optionClassName={"select-list"}
                            />
                          </div>
                        )}
                      </>
                    )}
                  </>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles["footer-util"]}>
          <div className={styles["footer-promotion"]}>
            <h3 className={`${styles["title"]} title-5`}>Receive new promotions</h3>
            <p className={styles["desc"]}>Duis ea tempor commodo amet reprehende</p>
            <div className={styles["email-area"]}>
              <TextField
                placeholder="Input your email"
                className="type-1"
                defaultValue=""
                size="small"
              />
              <Button
                type="submit"
                variant="contained"
                className={`btn-lg btn-type1 ${styles["btn-email"]}`}
              >
                Subscribe
              </Button>
            </div>
            <ul className={`${styles["sns-area"]}`}>
              {snsLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className={`btn-sns ${item.class}`}>
                    {item.icon}
                    <span className="blind">{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles["copy-util"]}>
              <p className={styles["copy"]}>&copy; 2025 Brand, Inc.</p>
              <ul className={`${styles["util-link"]}`}>
                {utilLink.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const menu = {
  links: [
    { text: "English", id: "english" },
    { text: "Korea", id: "korea" },
  ],
};

const menuData = [
  {
    title: "About",
    type: "links",
    links: ["Home", "Shop", "Our story", "Blogs"],
  },
  {
    title: "Help",
    type: "links",
    links: ["Shipping & Returns", "Track Order", "FAQs"],
  },
  {
    title: "Contact",
    type: "contact",
    phone: "(+1) 123 456 7893",
    email: "name@email.com",
  },
];

const snsLinks = [
  { name: "twitter", href: "/twitter", class: "ico-twitter", icon: <Twitter /> },
  { name: "facebook", href: "/facebook", class: "ico-facebook", icon: <Facebook /> },
  { name: "linkedIn", href: "/linkedIn", class: "ico-linkedIn", icon: <LinkedIn /> },
  { name: "youtube", href: "/youtube", class: "ico-youtube", icon: <YouTube /> },
];

const utilLink = [
  { name: "Privacy", href: "/" },
  { name: "Terms", href: "/" },
  { name: "Sitemap", href: "/" },
];

export default Footer;
