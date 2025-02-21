/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AmazonProductResponse } from '../models/AmazonProductResponse';
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
}
