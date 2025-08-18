/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleFileExtensions: ['ts','tsx','js','jsx','json'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.jest.json' }],
    '^.+\\.(js|jsx)$': 'babel-jest'
  },
  // Permite transformar libs ESM dentro de node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(cheerio|enzyme|@cfaester/enzyme-adapter-react-18)/)'
  ],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx)']
};
