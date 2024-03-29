import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import matchers from '@testing-library/jest-dom/matchers';
import { server } from './mocks/server'

// extends Vitest's expect method with methods from react-testing-library
expect.extend(matchers);

// runs a cleanup after each test case (e.g. clearing jsdom)
afterEach(() => cleanup());
// Start server before all tests
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
//  Close server after all tests
afterAll(() => server.close());
// Reset handlers after each test `important for test isolation`
afterEach(() => server.resetHandlers());
