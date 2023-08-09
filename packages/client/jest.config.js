import dotenv from 'dotenv'
dotenv.config()

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
  moduleNameMapper: {
      '\\.(css|less|scss|sss|styl|pcss)$': 'identity-obj-proxy',
      '^[./a-zA-Z0-9$_-]+\\.svg$': '<rootDir>/src/utils/fileTransformer.js',
  },
  setupFiles: ["jest-canvas-mock"],
  globals: {
    __SERVER_PORT__: process.env.SERVER_PORT,
  },
}
