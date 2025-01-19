export interface FAQConfig {
  apiKey: string
  projectId: string
  baseUrl?: string
}

export interface Category {
  id: string
  name: string
  slug: string
  parentId?: string
  description?: string
  createdAt: string
  updatedAt: string
}

export interface FAQ {
  id: string
  question: string
  answer: string
  categoryId: string
  slug: string
  status: 'draft' | 'published'
  metadata?: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface FAQResponse {
  data: FAQ[]
  meta: {
    total: number
    page: number
    perPage: number
  }
}

export interface CategoryResponse {
  data: Category[]
  meta: {
    total: number
    page: number
    perPage: number
  }
}

export class FAQError extends Error {
  code?: string
  status?: number
  details?: any

  constructor(message: string, code?: string, status?: number, details?: any) {
    super(message)
    this.name = 'FAQError'
    this.code = code
    this.status = status
    this.details = details

    // Ensure instanceof works correctly
    Object.setPrototypeOf(this, FAQError.prototype)
  }
}
