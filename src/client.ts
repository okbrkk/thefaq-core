import axios, { AxiosInstance } from 'axios'
import {
  FAQConfig,
  FAQ,
  Category,
  FAQResponse,
  CategoryResponse,
  FAQError,
} from './types'

export class FAQClient {
  private client: AxiosInstance
  private config: FAQConfig

  constructor(config: FAQConfig) {
    this.config = config
    this.client = axios.create({
      baseURL: this.config.baseUrl || 'https://api.thefaq.app/v1',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        'X-Project-ID': config.projectId,
        'Content-Type': 'application/json',
      },
    })

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        throw new FAQError(
          error.message || 'An error occurred',
          error.response?.data?.code || 'UNKNOWN_ERROR',
          error.response?.status || 500,
          error.response?.data?.details,
        )
      },
    )
  }

  // Category methods
  async getCategories(params?: {
    page?: number
    perPage?: number
  }): Promise<CategoryResponse> {
    const { data } = await this.client.get('/categories', { params })
    return data
  }

  async getCategory(slug: string): Promise<Category> {
    const { data } = await this.client.get(`/categories/${slug}`)
    return data
  }

  // FAQ methods
  async getFAQs(params?: {
    categorySlug?: string
    page?: number
    perPage?: number
    status?: 'draft' | 'published'
  }): Promise<FAQResponse> {
    const { data } = await this.client.get('/faqs', { params })
    return data
  }

  async getFAQ(slug: string): Promise<FAQ> {
    const { data } = await this.client.get(`/faqs/${slug}`)
    return data
  }

  async getFAQsByCategory(
    categorySlug: string,
    params?: {
      page?: number
      perPage?: number
      status?: 'draft' | 'published'
    },
  ): Promise<FAQResponse> {
    const { data } = await this.client.get(`/categories/${categorySlug}/faqs`, {
      params,
    })
    return data
  }

  // Search method
  async searchFAQs(
    query: string,
    params?: {
      categorySlug?: string
      page?: number
      perPage?: number
    },
  ): Promise<FAQResponse> {
    const { data } = await this.client.get('/faqs/search', {
      params: { q: query, ...params },
    })
    return data
  }
}
