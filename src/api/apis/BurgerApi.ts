/* tslint:disable */
/* eslint-disable */
/**
 * Menu API
 * Burger menu API docs
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */


import * as runtime from '../runtime';
import type {
  BurgerOfTheDay,
} from '../models/index';
import {
    BurgerOfTheDayFromJSON,
    BurgerOfTheDayToJSON,
} from '../models/index';

export interface MenuBurgerOfTheDayCreateRequest {
    data: Omit<BurgerOfTheDay, 'id'|'price'>;
}

export interface MenuBurgerOfTheDayDeleteRequest {
    id: string;
}

export interface MenuBurgerOfTheDayReadRequest {
    id: string;
}

export interface MenuBurgerOfTheDayUpdateRequest {
    id: string;
    data: Omit<BurgerOfTheDay, 'id'|'price'>;
}

/**
 * 
 */
export class BurgerApi extends runtime.BaseAPI {

    /**
     */
    async menuBurgerOfTheDayCreateRaw(requestParameters: MenuBurgerOfTheDayCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BurgerOfTheDay>> {
        if (requestParameters['data'] == null) {
            throw new runtime.RequiredError(
                'data',
                'Required parameter "data" was null or undefined when calling menuBurgerOfTheDayCreate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/menu/burger-of-the-day/`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: BurgerOfTheDayToJSON(requestParameters['data']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BurgerOfTheDayFromJSON(jsonValue));
    }

    /**
     */
    async menuBurgerOfTheDayCreate(requestParameters: MenuBurgerOfTheDayCreateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BurgerOfTheDay> {
        const response = await this.menuBurgerOfTheDayCreateRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async menuBurgerOfTheDayDeleteRaw(requestParameters: MenuBurgerOfTheDayDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<void>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling menuBurgerOfTheDayDelete().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/menu/burger-of-the-day/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.VoidApiResponse(response);
    }

    /**
     */
    async menuBurgerOfTheDayDelete(requestParameters: MenuBurgerOfTheDayDeleteRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<void> {
        await this.menuBurgerOfTheDayDeleteRaw(requestParameters, initOverrides);
    }

    /**
     */
    async menuBurgerOfTheDayListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<Array<BurgerOfTheDay>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/menu/burger-of-the-day/`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(BurgerOfTheDayFromJSON));
    }

    /**
     */
    async menuBurgerOfTheDayList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<Array<BurgerOfTheDay>> {
        const response = await this.menuBurgerOfTheDayListRaw(initOverrides);
        return await response.value();
    }

    /**
     * Returns a random burger of the day.
     */
    async menuBurgerOfTheDayRandomListRaw(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BurgerOfTheDay>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/menu/burger-of-the-day/random`,
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BurgerOfTheDayFromJSON(jsonValue));
    }

    /**
     * Returns a random burger of the day.
     */
    async menuBurgerOfTheDayRandomList(initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BurgerOfTheDay> {
        const response = await this.menuBurgerOfTheDayRandomListRaw(initOverrides);
        return await response.value();
    }

    /**
     */
    async menuBurgerOfTheDayReadRaw(requestParameters: MenuBurgerOfTheDayReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BurgerOfTheDay>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling menuBurgerOfTheDayRead().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/menu/burger-of-the-day/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'GET',
            headers: headerParameters,
            query: queryParameters,
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BurgerOfTheDayFromJSON(jsonValue));
    }

    /**
     */
    async menuBurgerOfTheDayRead(requestParameters: MenuBurgerOfTheDayReadRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BurgerOfTheDay> {
        const response = await this.menuBurgerOfTheDayReadRaw(requestParameters, initOverrides);
        return await response.value();
    }

    /**
     */
    async menuBurgerOfTheDayUpdateRaw(requestParameters: MenuBurgerOfTheDayUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<runtime.ApiResponse<BurgerOfTheDay>> {
        if (requestParameters['id'] == null) {
            throw new runtime.RequiredError(
                'id',
                'Required parameter "id" was null or undefined when calling menuBurgerOfTheDayUpdate().'
            );
        }

        if (requestParameters['data'] == null) {
            throw new runtime.RequiredError(
                'data',
                'Required parameter "data" was null or undefined when calling menuBurgerOfTheDayUpdate().'
            );
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        if (this.configuration && (this.configuration.username !== undefined || this.configuration.password !== undefined)) {
            headerParameters["Authorization"] = "Basic " + btoa(this.configuration.username + ":" + this.configuration.password);
        }
        const response = await this.request({
            path: `/menu/burger-of-the-day/{id}/`.replace(`{${"id"}}`, encodeURIComponent(String(requestParameters['id']))),
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: BurgerOfTheDayToJSON(requestParameters['data']),
        }, initOverrides);

        return new runtime.JSONApiResponse(response, (jsonValue) => BurgerOfTheDayFromJSON(jsonValue));
    }

    /**
     */
    async menuBurgerOfTheDayUpdate(requestParameters: MenuBurgerOfTheDayUpdateRequest, initOverrides?: RequestInit | runtime.InitOverrideFunction): Promise<BurgerOfTheDay> {
        const response = await this.menuBurgerOfTheDayUpdateRaw(requestParameters, initOverrides);
        return await response.value();
    }

}
