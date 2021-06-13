import { Container } from '@roots/container';
import { Actions } from './actions';
import { Compiler } from './Compiler';
import { Config } from './Config';
import { Prettier } from './Prettier';
interface Clover {
    actions: Actions;
    config: Config;
    compiler: Compiler;
    data: Container;
    prettier: Prettier;
}
declare class Clover {
    actions: Actions;
    data: Container;
    compiler: Compiler;
    config: Config;
    prettier: Prettier;
    constructor();
    generate(generator: any): Promise<void>;
    getGeneratorSrc(generator: string): Promise<{
        [key: string]: any;
    }>;
}
export { Clover };
//# sourceMappingURL=Clover.d.ts.map