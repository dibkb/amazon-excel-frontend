/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmazonProductResponse } from '../models/AmazonProductResponse';
import type { ProductSageResponse } from '../models/ProductSageResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Health Check
     * @returns any Successful Response
     * @throws ApiError
     */
    public static healthCheckHealthGet(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/health',
        });
    }
    /**
     * Get Amazon Product
     * @param asin
     * @returns AmazonProductResponse Successful Response
     * @throws ApiError
     */
    public static getAmazonProductAmazonAsinGet(
        asin: string,
    ): CancelablePromise<AmazonProductResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/{asin}',
            path: {
                'asin': asin,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Amazon Review
     * @param imageId
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAmazonReviewAmazonReviewImageIdGet(
        imageId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/review/{image_id}',
            path: {
                'image_id': imageId,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Amazon Product Sage
     * @param asin
     * @returns ProductSageResponse Successful Response
     * @throws ApiError
     */
    public static getAmazonProductSageAmazonProductSageAsinGet(
        asin: string,
    ): CancelablePromise<ProductSageResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/product-sage/{asin}',
            path: {
                'asin': asin,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Amazon Competitors
     * @param asin
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAmazonCompetitorsAmazonCompetitorsAsinGet(
        asin: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/competitors/{asin}',
            path: {
                'asin': asin,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
