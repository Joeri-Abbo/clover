import { Parser } from './parsers';
import prettier from 'prettier';
export declare class Prettier {
    parsers: {
        js: string;
        jsx: string;
        graphql: string;
        css: string;
        json: string;
        md: string;
        html: string;
        htm: string;
        ts: string;
        tsx: string;
        yml: string;
        yaml: string;
        less: string;
    };
    config: prettier.Options;
    constructor(config: prettier.Options);
    infer(file: string): Promise<Parser>;
    format(content: any, parser: Parser): string;
}
//# sourceMappingURL=Prettier.d.ts.map