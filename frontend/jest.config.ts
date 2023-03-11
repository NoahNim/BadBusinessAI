import type { Config } from 'jest';

const config: Config = {
    verbose: true,
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    setupFilesAfterEnv: ['./setupTests.ts']
};

export default config;