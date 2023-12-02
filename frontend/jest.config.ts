export default{
    clearMocks:true,
    testEnvironment:"jsdom",
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./src/jest.setup.ts'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    },
    testMatch: [
      '<rootDir>/src/**/*.spec.(ts|tsx)',
      '<rootDir>/src/**/*.test.(ts|tsx)',
    ],
    collectCoverage: true,
    coverageDirectory: '<rootDir>/coverage',
    coverageReporters: ['lcov', 'text', 'html'],
    transform: {
      "\\.[jt]sx?$": "babel-jest",
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':'jest-transform-stub',
      '\\.(yaml)$': 'jest-raw-loader',
    },
}
