/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ReviewSchema } from '../models/ReviewSchema';
import type { SwotAnalysisConsolidated } from '../models/SwotAnalysisConsolidated';
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
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAmazonProductAmazonAsinGet(
        asin: string,
    ): CancelablePromise<Record<string, any>> {
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
     * Get Amazon Product Sage
     * @param asin
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAmazonProductSageAmazonProductSageAsinGet(
        asin: string,
    ): CancelablePromise<any> {
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
     * Get Amazon Product Sage Web Reviewer
     * @param asin
     * @returns ReviewSchema Successful Response
     * @throws ApiError
     */
    public static getAmazonProductSageWebReviewerAmazonProductSageWebReviewerAsinGet(
        asin: string,
    ): CancelablePromise<Array<ReviewSchema>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/product-sage/web-reviewer/{asin}',
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
    /**
     * Get Amazon Competitors
     * @param asin
     * @returns any Successful Response
     * @throws ApiError
     */
    public static getAmazonCompetitorsAmazonProductEnhancementsAsinGet(
        asin: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/product-enhancements/{asin}',
            path: {
                'asin': asin,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
    /**
     * Get Amazon Swot
     * @param asin
     * @param competitors
     * @returns SwotAnalysisConsolidated Successful Response
     * @throws ApiError
     */
    public static getAmazonSwotAmazonSwotConsolidatedAsinGet(
        asin: string,
        competitors: string,
    ): CancelablePromise<SwotAnalysisConsolidated> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/amazon/swot-consolidated/{asin}',
            path: {
                'asin': asin,
            },
            query: {
                'competitors': competitors,
            },
            errors: {
                422: `Validation Error`,
            },
        });
    }
}
