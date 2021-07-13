export default {
    clearMocks: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageProvider: 'v8',
    preset: 'ts-jest',
    roots: ['<rootDir>'],
    moduleNameMapper: {
        '@libs/(.*)': '<rootDir>/src/libs/$1',
        'src/(.*)': '<rootDir>/src/$1',
    },
    moduleFileExtensions: ['js', 'ts'],
    globals: {
        'ts-jest': {
            babelConfig: true,
        },
    },
};
