<!-- # @thefaq-app/core

Core SDK for thefaqapp - FAQ management and SEO optimization platform.

## Installation

```bash
npm install @thefaq-app/core
# or
yarn add @thefaq-app/core
```

## Quick Start

```typescript
import FAQClient from '@thefaq-app/core';

const client = new FAQClient({
  apiKey: 'your-api-key',
  projectId: 'your-project-id',
  // Optional: override the base URL
  // baseUrl: 'https://api.thefaq.app/v1'
});

// Get all categories
const categories = await client.getCategories();

// Get FAQs for a specific category
const faqs = await client.getFAQsByCategory('category-slug');

// Search FAQs
const searchResults = await client.searchFAQs('how to');
```

## API Reference

### Configuration

The `FAQClient` constructor accepts a configuration object with the following properties:

```typescript
interface FAQConfig {
  apiKey: string;      // Your API key
  projectId: string;   // Your project ID
  baseUrl?: string;    // Optional: Override the API base URL
}
```

### Methods

#### Categories

- `getCategories(params?: { page?: number; perPage?: number }): Promise<CategoryResponse>`
  Get a paginated list of categories.

- `getCategory(slug: string): Promise<Category>`
  Get a single category by its slug.

#### FAQs

- `getFAQs(params?: { categorySlug?: string; page?: number; perPage?: number; status?: 'draft' | 'published' }): Promise<FAQResponse>`
  Get a paginated list of FAQs with optional filtering.

- `getFAQ(slug: string): Promise<FAQ>`
  Get a single FAQ by its slug.

- `getFAQsByCategory(categorySlug: string, params?: { page?: number; perPage?: number; status?: 'draft' | 'published' }): Promise<FAQResponse>`
  Get FAQs for a specific category.

#### Search

- `searchFAQs(query: string, params?: { categorySlug?: string; page?: number; perPage?: number }): Promise<FAQResponse>`
  Search FAQs by query string with optional category filtering.

### Types

The SDK exports TypeScript interfaces for all data structures:

- `Category`
- `FAQ`
- `CategoryResponse`
- `FAQResponse`
- `FAQError`

## Error Handling

The SDK throws `FAQError` instances for API errors. These include:

- `error.message`: Human-readable error message
- `error.code`: Error code from the API
- `error.status`: HTTP status code
- `error.details`: Additional error details from the API

Example:

```typescript
try {
  const faqs = await client.getFAQs();
} catch (error) {
  if (error instanceof FAQError) {
    console.error(`API Error: ${error.message} (${error.code})`);
  }
}
```
<!--
## License

MIT --> -->