/** @type {import('jest').Config} */
const config = {
  testEnvironment: 'jsdom',
  modulePaths: ['<rootDir>/src/'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/jest.config.mjs',
    '!**/next.config.mjs',
    '!**/types/**',
    '!**/views/**',
    '!**/pages/api/**',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|scss|sass|less)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(jpg|jpeg|png|gif|svg|webp|ico)$': '<rootDir>/__mocks__/fileMock.js',
    '^next/image$': '<rootDir>/__mocks__/nextImageMock.js',
    '^next/link$': '<rootDir>/__mocks__/nextLinkMock.js',
    '^swr$': '<rootDir>/__mocks__/swrMock.js',
  },
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  testMatch: [
    '**/_test_/**/*.(spec|test).(ts|tsx|js|jsx)',
    '**/__tests__/**/*.(spec|test).(ts|tsx|js|jsx)',
  ],
}

module.exports = config
