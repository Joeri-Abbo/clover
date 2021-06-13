import type Prettier from 'prettier';
export declare class Config {
    projectDir: string;
    templateDir: string;
    prettier: Prettier.Options;
    constructor(dir: string);
    get execa(): {
        cwd: string;
    };
}
//# sourceMappingURL=Config.d.ts.map