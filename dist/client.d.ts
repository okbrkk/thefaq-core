import { FAQConfig, FAQ, Category, FAQResponse, CategoryResponse } from './types';
export declare class FAQClient {
    private client;
    private config;
    constructor(config: FAQConfig);
    getCategories(params?: {
        page?: number;
        perPage?: number;
    }): Promise<CategoryResponse>;
    getCategory(slug: string): Promise<Category>;
    getFAQs(params?: {
        categorySlug?: string;
        page?: number;
        perPage?: number;
        status?: 'draft' | 'published';
    }): Promise<FAQResponse>;
    getFAQ(slug: string): Promise<FAQ>;
    getFAQsByCategory(categorySlug: string, params?: {
        page?: number;
        perPage?: number;
        status?: 'draft' | 'published';
    }): Promise<FAQResponse>;
    searchFAQs(query: string, params?: {
        categorySlug?: string;
        page?: number;
        perPage?: number;
    }): Promise<FAQResponse>;
}
