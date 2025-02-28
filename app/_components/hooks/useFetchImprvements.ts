// import api from "@/src/axios/base";

import { ProductSageResponse } from "@/src/api";
import { useEffect } from "react";
import { productStore } from "@/app/store/productStore";

const fakeData: ProductSageResponse = {
  improvements: [
    {
      improvement: "Enhance battery life and charging speed",
      affected_component: "Battery system",
      expected_impact: "Increased customer satisfaction and usability",
      priority_level: "High",
      implementation_complexity: "Medium",
    },
    {
      improvement: "Improve keycap quality and offer standard key sizes",
      affected_component: "Keyboard hardware",
      expected_impact: "Better typing experience and durability",
      priority_level: "Medium",
      implementation_complexity: "Low",
    },
    {
      improvement: "Introduce adjustable stand for ergonomic improvements",
      affected_component: "Keyboard structure",
      expected_impact: "Enhanced comfort for long usage periods",
      priority_level: "Medium",
      implementation_complexity: "Medium",
    },
    {
      improvement:
        "Strengthen device switching shortcuts and Bluetooth connectivity",
      affected_component: "Software/Firmware",
      expected_impact: "Smoother workflow and enhanced productivity",
      priority_level: "High",
      implementation_complexity: "Medium",
    },
    {
      improvement: "Address the power switch durability",
      affected_component: "Power management hardware",
      expected_impact: "Reduced wear and tear, longer product lifespan",
      priority_level: "Low",
      implementation_complexity: "Low",
    },
  ],
  sentiments: [
    {
      sentiment: "Positive",
      features: "battery life,touch quality",
      key_aspects: "long-lasting charge,high touch quality",
    },
    {
      sentiment: "Positive",
      features: "beauty",
      key_aspects: "very beautiful",
    },
    {
      sentiment: "Positive",
      features: "price, delivery time, packaging, product correctness",
      key_aspects:
        "initial concerns about late delivery, received order earlier than expected, item was correct and functional, positive review to encourage seller",
    },
    {
      sentiment: "Positive",
      features: "tactile keys, key travel, pink colour, backlit feature",
      key_aspects:
        "happy with purchase, loves the keyboard, displaced old keyboard",
    },
    {
      sentiment: "Positive",
      features:
        "hot-swappable, open source firmware, doubleshot keycaps, lower price, high durability, 3 device connectivity, exceptionally good battery life",
      key_aspects:
        "sleek design, muted and subtle appearance, cheaper keycap quality, non-standard key sizes, excellent customer support, overall positive writing experience",
    },
    {
      sentiment: "Positive",
      features:
        "keyboard feel, typing experience, battery life, seamless switching, customizable shortcut keys, smart wakeup option, wrist rest, mouse performance, mouse scroll, form factor",
      key_aspects:
        "improved workflow, excellent battery life, easy system switching, comfortable for long use, high productivity rating",
    },
    {
      sentiment: "Positive",
      features:
        "sleek design, outstanding functionality, compact layout, low-profile mechanical switches, tactile feel, build quality, aluminum top plate, white backlighting, Bluetooth connectivity, dedicated Mac keys, long battery life",
      key_aspects:
        "space-saving, key comfort, typing speed, premium feel, modern touch, seamless pairing, minimal charging needs, overall performance, highly recommended",
    },
    {
      sentiment: "Positive",
      features:
        "thin design, steady key presses, good build quality, ergonomic usability, long battery life, device switching shortcuts",
      key_aspects:
        "lightweight design, sturdy build, ergonomic typing experience, long battery life, power switch feels flimsy, no adjustable stand",
    },
  ],
};
export const useFetchImprovements = (asin: string) => {
  const { setImprovements } = productStore();
  productStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        // const { data } = (await api.get(`/amazon/product-sage/${asin}`)) as {
        //   data: ProductSageResponse;
        // };
        setImprovements(fakeData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [asin, setImprovements]);
};
