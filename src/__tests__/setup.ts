import { beforeAll, afterAll, afterEach } from 'vitest'
import { setupServer } from 'msw/node'
import { handlers } from '../mocks/handlers'

export const server = setupServer(...handlers)

beforeAll(() => {
  // Enable request interception
  server.listen({ onUnhandledRequest: 'warn' })
})

afterEach(() => {
  // Reset handlers between tests
  server.resetHandlers()
})

afterAll(() => {
  // Clean up after tests
  server.close()
})
