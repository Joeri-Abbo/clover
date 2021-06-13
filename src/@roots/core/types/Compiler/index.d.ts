import handlebars from 'handlebars';
import type { HelperDelegate } from 'handlebars';
interface Compiler {
    instance: typeof handlebars;
    getHelpers(data: any): [string, HelperDelegate][];
    compile(template: string, data: Handlebars.RuntimeOptions['data']): string;
}
declare class Compiler {
    instance: typeof handlebars;
    constructor();
}
export { Compiler };
//# sourceMappingURL=index.d.ts.map