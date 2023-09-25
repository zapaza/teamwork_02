// eslint-disable-next-line @typescript-eslint/no-var-requires
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'jsdom',
	testMatch: ['<rootDir>/src/**/*.test.{ts,tsx}'],
	moduleNameMapper: {
		'\\.(css|less|scss|sss|styl|pcss)$': 'identity-obj-proxy',
		'^[./a-zA-Z0-9$_-]+\\.svg$': '<rootDir>/src/utils/fileTransformer.js',
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	setupFiles: ['jest-canvas-mock'],
	globals: {
		__SERVER_PORT__: process.env.SERVER_PORT,
		__INTERNAL_SERVER_URL__: process.env.INTERNAL_SERVER_URL,
		__EXTERNAL_SERVER_URL__: process.env.EXTERNAL_SERVER_URL,
	},
};
