"use client";

// components/Item.tsx
import Link from "next/link";
import Button from "@mui/material/Button";
import React from "react";

interface ItemProps {
  item: {
    name: string;
    type?: string;
    desc: string;
    price: string;
    originalPrice?: string;
    image: string;
    link?: string;
  };
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className="item-list">
      <Link href={item.link || "#"} className="link"></Link>
      <span className="item-img">
        <img src={item.image} alt={item.name} />
      </span>
      {item.type && <span className="item-type">{item.type}</span>}
      <div className="item-desc">
        <span className="name">{item.name}</span>
        <span className="desc">{item.desc}</span>
        <span className="price">
          <em>{item.price}</em>
          {item.originalPrice && <span className="original">{item.originalPrice}</span>}
          <Button type="button" className="btn-ico btn-cart">
            <span className="blind">Cart</span>
          </Button>
        </span>
      </div>
    </div>
  );
};

export default Item;
