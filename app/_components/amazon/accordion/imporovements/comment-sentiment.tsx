"use client";
import React from "react";
import { productStore } from "@/app/store/productStore";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { geistMono } from "@/app/fonts";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Features from "../../chip/features";
import Sentiment from "../../chip/sentiment";
import Image from "next/image";
const CommentSentiment = () => {
  const { improvements, loadingImprovements } = productStore();
  const loadingContent = (
    <div className="flex gap-2">
      <Image
        src="https://media.tenor.com/wpSo-8CrXqUAAAAi/loading-loading-forever.gif"
        alt="Loading..."
        width={20}
        height={20}
        priority
      />
      <p className="text-sm text-stone-500">Analyzing customer reviews...</p>
    </div>
  );
  const content = (
    <Table>
      <TableCaption>An analysis of the customer reviews</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Key Aspects</TableHead>
          <TableHead className="">Features</TableHead>
          <TableHead className="text-right">Sentiment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {improvements?.sentiments.map((sentiment) => (
          <TableRow key={sentiment.features}>
            <TableCell className="font-medium">
              {sentiment.key_aspects}
            </TableCell>
            <TableCell>
              <Features features={sentiment.features} />
            </TableCell>
            <TableCell className="text-right">
              <Sentiment text={sentiment.sentiment} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full"
      defaultValue="comments"
    >
      <AccordionItem value="comments">
        <AccordionTrigger className={`${geistMono.className} text-stone-700`}>
          Review Analysis (Amazon Page)
        </AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 m-6">
          {loadingImprovements ? loadingContent : content}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default CommentSentiment;
