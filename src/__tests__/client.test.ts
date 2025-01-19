import { describe, it, expect, beforeEach } from 'vitest'
import { http, HttpResponse } from 'msw'
import { FAQClient } from '../client'
import { mockCategory, mockFAQ } from '../mocks/handlers'
import { FAQError } from '../types'
import { server } from './setup'

describe('FAQClient', () => {
  const client = new FAQClient({
    apiKey: 'test-api-key',
    projectId: 'test-project',
  })

  describe('Categories', () => {
    it('should fetch categories', async () => {
      const response = await client.getCategories()
      expect(response.data).toHaveLength(1)
      expect(response.data[0]).toEqual(mockCategory)
      expect(response.meta).toEqual({ total: 1, page: 1, perPage: 10 })
    })

    it('should fetch a single category', async () => {
      const category = await client.getCategory(mockCategory.slug)
      expect(category).toEqual(mockCategory)
    })

    it('should handle non-existent category', async () => {
      await expect(client.getCategory('non-existent')).rejects.toThrow()
    })
  })

  describe('FAQs', () => {
    it('should fetch FAQs', async () => {
      const response = await client.getFAQs()
      expect(response.data).toHaveLength(1)
      expect(response.data[0]).toEqual(mockFAQ)
      expect(response.meta).toEqual({ total: 1, page: 1, perPage: 10 })
    })

    it('should fetch a single FAQ', async () => {
      const faq = await client.getFAQ(mockFAQ.slug)
      expect(faq).toEqual(mockFAQ)
    })

    it('should handle non-existent FAQ', async () => {
      await expect(client.getFAQ('non-existent')).rejects.toThrow()
    })

    it('should fetch FAQs by category', async () => {
      const response = await client.getFAQsByCategory(mockCategory.slug)
      expect(response.data).toHaveLength(1)
      expect(response.data[0]).toEqual(mockFAQ)
    })

    it('should handle non-existent category for FAQs', async () => {
      await expect(client.getFAQsByCategory('non-existent')).rejects.toThrow()
    })
  })

  describe('Search', () => {
    beforeEach(() => {
      // Reset handlers and add specific search handler
      server.resetHandlers(
        http.get(
          'https://api.thefaq.app/v1/faqs/search',
          async ({ request }) => {
            const url = new URL(request.url)
            const query = url.searchParams.get('q')?.toLowerCase()

            if (query && mockFAQ.question.toLowerCase().includes(query)) {
              return HttpResponse.json({
                data: [mockFAQ],
                meta: { total: 1, page: 1, perPage: 10 },
              })
            }

            return HttpResponse.json({
              data: [],
              meta: { total: 0, page: 1, perPage: 10 },
            })
          },
        ),
      )
    })

    it('should search FAQs with results', async () => {
      const response = await client.searchFAQs('thefaqapp')
      expect(response.data).toHaveLength(1)
      expect(response.data[0]).toEqual(mockFAQ)
    })

    it('should search FAQs with no results', async () => {
      const response = await client.searchFAQs('nonexistent')
      expect(response.data).toHaveLength(0)
    })
  })

  describe('Error Handling', () => {
    beforeEach(() => {
      server.resetHandlers(
        http.get('https://api.thefaq.app/v1/categories/:slug', () => {
          return new HttpResponse(null, {
            status: 404,
            statusText: 'Not Found',
          })
        }),
      )
    })

    it('should handle API errors correctly', async () => {
      try {
        await client.getCategory('non-existent')
        expect.fail('Should have thrown an error')
      } catch (error) {
        expect(error).toBeInstanceOf(FAQError)
        expect(error.status).toBe(404)
      }
    })
  })
})
