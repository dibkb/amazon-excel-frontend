/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Description } from './Description';
import type { Ratings } from './Ratings';
import type { Review } from './Review';
import type { Specifications } from './Specifications';
export type Product = {
    title?: (string | null);
    image?: (string | null);
    price?: number;
    categories?: Array<string>;
    description?: Description;
    specifications?: Specifications;
    ratings?: Ratings;
    reviews?: Array<Review>;
};

