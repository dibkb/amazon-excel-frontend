"use client";
import { geistMono } from "@/app/fonts";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Accordion } from "@/components/ui/accordion";
import React from "react";
import { productStore } from "@/app/store/productStore";
import Badge from "../../chip/Badge";
import Image from "next/image";

const SuggestedImprovements = () => {
  const { improvements, loadingImprovements } = productStore();
  const content = (
    <div className="grid grid-cols-1 gap-8 p-4">
      {improvements?.improvements.map((item, index) => (
        <div key={index} className="flex flex-col gap-4 font-medium">
          <div className="flex justify-between items-center text-lg">
            {item.affected_component}
          </div>
          <section className="grid grid-cols-1 mt-2 ">
            <span className="text-gray-700 text-sm grid grid-cols-2 border px-4 py-2">
              <strong>Priority Level</strong>
              <Badge text={item.priority_level} />
            </span>

            <span className="text-gray-700 text-sm grid grid-cols-2 border-b border-r border-l px-4 py-2">
              <strong>Implementation Complexity</strong>
              <Badge text={item.implementation_complexity} />
            </span>
            <span className="text-gray-700 text-sm grid grid-cols-2 border-b border-r border-l px-4 py-2">
              <strong>Improvement </strong>
              <p>{item.improvement}</p>
            </span>

            <span className="text-gray-700 text-sm grid grid-cols-2 border-b border-r border-l px-4 py-2">
              <strong>Expected Impact</strong>
              <p>{item.expected_impact}</p>
            </span>
          </section>
        </div>
      ))}
    </div>
  );
  const loadingContent = (
    <div className="flex gap-2">
      <Image
        src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
        alt="Loading..."
        width={20}
        height={20}
        priority
      />
      <p className="text-sm text-stone-500">
        Analyzing product info and generating improvements...
      </p>
    </div>
  );
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="thumbnail"
    >
      <AccordionItem value="thumbnail">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Suggested Improvements
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 m-6">
          {loadingImprovements ? loadingContent : content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SuggestedImprovements;
