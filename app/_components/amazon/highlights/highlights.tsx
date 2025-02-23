"use client";
import ChevronRightSvg from "./chevron-right-svg";
interface ProductHighlights {
  highlights: string[];
}

const ProductHighlights = ({ highlights }: ProductHighlights) => {
  const content = highlights.map((highlight) => (
    <li key={highlight} className="flex items-start gap-2">
      <ChevronRightSvg />
      <span>{highlight}</span>
    </li>
  ));
  return (
    <section className="flex flex-col gap-2 my-4 border-b pb-4">
      <h2 className="font-semibold text-stone-900 mb-4">Product Description</h2>
      <ul className="flex flex-col gap-3 text-sm font-medium text-stone-900">
        {content}
      </ul>
    </section>
  );
};

export default ProductHighlights;
