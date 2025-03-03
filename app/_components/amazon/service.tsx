"use client";
import React from "react";
import Image from "next/image";
const service = [
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-returns._CB562506492_.png",
    title: " 7 days Service Centre Replacement ",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/trust_icon_free_shipping_81px._CB562549966_.png",
    title: "Free Shipping",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-warranty._CB485935626_.png",
    title: "Warranty Policy",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-cod._CB562506657_.png",
    title: "Cash/Pay on Delivery",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-top-brand._CB562506657_.png",
    title: "Top Brand",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/icon-amazon-delivered._CB562550117_.png",
    title: "Amazon Delivered",
  },
  {
    image:
      "https://m.media-amazon.com/images/G/31/A2I-Convert/mobile/IconFarm/Secure-payment._CB650126890_.png",
    title: "Secure Payment",
  },
];
const Service = () => {
  return (
    <div className="flex gap-4">
      {service.map((item) => (
        <div
          key={item.title}
          className="flex flex-col items-center gap-2 max-w-[90px]"
        >
          <Image src={item.image} alt={item.title} width={35} height={35} />
          <p className="text-xs font-semibold text-stone-500 line-clamp-2 text-center">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Service;
