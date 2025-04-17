"use client";
import { geistMono } from "@/app/fonts";
import { productStore } from "@/app/store/productStore";
import { cn } from "@/lib/utils";
import { SwotAnalysisConsolidated } from "@/src/api/models/SwotAnalysisConsolidated";

export const SwotRender = ({
  swot,
  selectedProducts,
}: {
  swot: SwotAnalysisConsolidated;
  selectedProducts: string[];
}) => {
  const { asin } = productStore();
  const strengths = swot.analysis.strengths;
  const weaknesses = swot.analysis.weaknesses;
  const opportunities = swot.analysis.opportunities;
  const threats = swot.analysis.threats;

  return (
    <main>
      <div
        className={cn(
          "flex gap-2 py-4 items-center justify-center",
          geistMono.className
        )}
      >
        <p className="text-stone-700">SWOT analysis for {asin}</p>
        <p className="text-stone-700">
          with {selectedProducts.map((product) => product).join(", ")}
        </p>
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <p
            className={cn(
              geistMono.className,
              "text-4xl font-semibold text-green-600"
            )}
          >
            S<small className="text-stone-700">trengths</small>
          </p>
          {strengths.map((strength, id) => (
            <ul key={id + strength.heading} className="flex flex-col gap-2">
              <li className="text-lg font-semibold list-disc">
                {strength.heading}
              </li>
              <li className="text-stone-700 font-medium">
                {strength.description}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <p
            className={cn(
              geistMono.className,
              "text-4xl text-red-600 font-semibold"
            )}
          >
            W<small className="text-stone-700">eaknesses</small>
          </p>
          {weaknesses.map((weakness, id) => (
            <ul key={id + weakness.heading} className="flex flex-col gap-2">
              <li className="text-lg font-semibold list-disc">
                {weakness.heading}
              </li>
              <li className="text-stone-700 font-medium">
                {weakness.description}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <p
            className={cn(
              geistMono.className,
              "text-4xl text-green-600 font-semibold"
            )}
          >
            O<small className="text-stone-700">pportunities</small>
          </p>
          {opportunities.map((opportunity, id) => (
            <ul key={id + opportunity.heading} className="flex flex-col gap-2">
              <li className="text-lg font-semibold list-disc">
                {opportunity.heading}
              </li>
              <li className="text-stone-700 font-medium">
                {opportunity.description}
              </li>
            </ul>
          ))}
        </div>
        <div>
          <p
            className={cn(
              geistMono.className,
              "text-4xl text-red-600 font-semibold"
            )}
          >
            T<small className="text-stone-700">hreats</small>
          </p>
          {threats.map((threat, id) => (
            <ul key={id + threat.heading} className="flex flex-col gap-2">
              <li className="text-lg font-semibold list-disc">
                {threat.heading}
              </li>
              <li className="text-stone-700 font-medium">
                {threat.description}
              </li>
            </ul>
          ))}
        </div>
      </div>
    </main>
  );
};
