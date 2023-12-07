import type { Config } from 'jest';
import baseJestConfig from '../../../jest.config.base';
import * as path from 'path';

const ignorePath = (...p: string[]) => {
    return p.map((val) => path.resolve(__dirname, '..', val));
};

export default async (): Promise<Config> => {
    const rootDir = path.resolve(__dirname, '../src');
    const baseJestConf = await baseJestConfig('app_backend');

    const filesToIgnore = ignorePath(
        './dist',
        './node_modules',
        './test',
        './reports',
        './.eslintrc.js',
        './.prettierrc.js',
        '../../jest.config.base.ts',
        './src/users/mock/repo',
        './src/main.ts',
        './src/utils',
    );

    return {
        ...baseJestConf,
        modulePathIgnorePatterns: filesToIgnore,
        showSeed: true,
        notify: false,
        verbose: true,
        collectCoverageFrom: [
            '**/**.(t|j)s',
            '!**/*.module.(t|j)s',
            '!**/entity/**/*.ts',
            '!**/utils/{s3,env,log}.util.ts',
            '!**/dto/pagination-req.dto.ts',
        ],
        transform: {
            '^.+\\.ts?$': [
                'ts-jest',
                {
                    tsconfig: {
                        allowJs: true,
                        experimentalDecorators: true,
                    },
                },
            ],
        },
        rootDir: rootDir,
        coverageThreshold: {
            global: {
                branches: 91,
                functions: 95,
                lines: 95,
                statements: 95,
            },
        },
    };
};
