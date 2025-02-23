import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface CategoriesProps {
  categories: string[];
}

const Categories = ({ categories }: CategoriesProps) => {
  if (categories.length === 0) return null;
  return (
    <Breadcrumb className="text-xs font-semibold">
      <BreadcrumbList>
        {categories?.slice(0, -1)?.map((category) => (
          <span key={category} className="flex">
            <BreadcrumbItem className="text-xs font-semibold">
              <BreadcrumbLink>{category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </span>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage className="text-xs font-semibold">
            {categories?.[categories.length - 1]}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default Categories;
