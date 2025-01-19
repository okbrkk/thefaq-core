import { http, HttpResponse } from 'msw'

const baseUrl = 'https://api.thefaq.app/v1'

export const mockCategory = {
  id: '1',
  name: 'Getting Started',
  slug: 'getting-started',
  description: 'Basic information about the product',
  createdAt: '2024-01-19T00:00:00.000Z',
  updatedAt: '2024-01-19T00:00:00.000Z',
}

export const mockFAQ = {
  id: '1',
  question: 'What is thefaqapp?',
  answer: 'thefaqapp is a SaaS platform for managing FAQs.',
  categoryId: '1',
  slug: 'what-is-thefaqapp',
  status: 'published',
  createdAt: '2024-01-19T00:00:00.000Z',
  updatedAt: '2024-01-19T00:00:00.000Z',
}

export const handlers = [
  // Categories
  http.get(`${baseUrl}/categories`, () => {
    return HttpResponse.json({
      data: [mockCategory],
      meta: { total: 1, page: 1, perPage: 10 },
    })
  }),

  http.get(`${baseUrl}/categories/:slug`, ({ params }) => {
    if (params.slug === mockCategory.slug) {
      return HttpResponse.json(mockCategory)
    }
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }),

  // FAQs
  http.get(`${baseUrl}/faqs`, () => {
    return HttpResponse.json({
      data: [mockFAQ],
      meta: { total: 1, page: 1, perPage: 10 },
    })
  }),

  http.get(`${baseUrl}/faqs/:slug`, ({ params }) => {
    if (params.slug === mockFAQ.slug) {
      return HttpResponse.json(mockFAQ)
    }
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }),

  http.get(`${baseUrl}/categories/:categorySlug/faqs`, ({ params }) => {
    if (params.categorySlug === mockCategory.slug) {
      return HttpResponse.json({
        data: [mockFAQ],
        meta: { total: 1, page: 1, perPage: 10 },
      })
    }
    return new HttpResponse(null, {
      status: 404,
      statusText: 'Not Found',
    })
  }),

  http.get(`${baseUrl}/faqs/search`, async ({ request }) => {
    const url = new URL(request.url)
    const query = url.searchParams.get('q')?.toLowerCase()

    if (!query) {
      return HttpResponse.json({
        data: [],
        meta: { total: 0, page: 1, perPage: 10 },
      })
    }

    if (mockFAQ.question.toLowerCase().includes(query)) {
      return HttpResponse.json({
        data: [mockFAQ],
        meta: { total: 1, page: 1, perPage: 10 },
      })
    }

    return HttpResponse.json({
      data: [],
      meta: { total: 0, page: 1, perPage: 10 },
    })
  }),
]
