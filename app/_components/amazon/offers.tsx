import { formatIndian } from "@/utils/amazon/format-number";
import { BadgePercent } from "lucide-react";
import React from "react";

const Offers = ({ price }: { price: number }) => {
  return (
    <div className="flex flex-col gap-2">
      <span className="flex items-center gap-2">
        <BadgePercent className="text-orange-600" />
        <p className="text-stone-900 font-bold">Offers</p>
      </span>
      <div className="flex gap-2 mt-2">
        <CardOffers type="no-cost-emi" price={price} />
        <CardOffers type="bank-offer" price={price} />
        <CardOffers type="cashback" price={price} />
        <CardOffers type="partner-offer" price={price} />
      </div>
    </div>
  );
};

export default Offers;

interface CardOffersProps {
  type: "no-cost-emi" | "bank-offer" | "cashback" | "partner-offer";
  price: number;
}
const CardOffers = ({ type, price }: CardOffersProps) => {
  let title = "";
  let description = "";
  switch (type) {
    case "no-cost-emi":
      title = "No Cost EMI";
      description = `₹${formatIndian(
        Number((price * 0.04).toFixed(2))
      )} EMI interest savings on select Credit Cards`;
      break;
    case "bank-offer":
      title = "Bank Offer";
      description = `₹${formatIndian(
        Number((price * 0.0306).toFixed(2))
      )} discount on select Credit Cards`;
      break;
    case "cashback":
      title = "Cashback";
      description = `₹${formatIndian(
        Number((price * 0.0499).toFixed(2))
      )} cashback as Amazon Pay Balance when…`;
      break;
    case "partner-offer":
      title = "Partner Offer";
      description = "Get GST invoice and save up to 28% on business purchases.";
      break;
  }
  return (
    <span className="flex flex-col gap-2 p-2 border rounded-sm max-w-[150px]">
      <p className="text-stone-900 font-bold">{title}</p>
      <p className="text-xs font-medium">{description}</p>
    </span>
  );
};
