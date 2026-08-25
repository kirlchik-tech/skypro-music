import type { Config } from 'jest';
import nextJest from 'next/jest.js';

// Подключаем встроенную конфигурацию Next.js для Jest
const createJestConfig = nextJest({
  dir: './',
});

const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Поддержка алиасов 
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

export default createJestConfig(config);