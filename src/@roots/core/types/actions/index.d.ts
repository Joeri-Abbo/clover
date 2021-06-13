import { sh } from './sh';
import { compile } from './compile';
import { copy } from './copy';
import { ensureDir } from './ensureDir';
import { clone } from './clone';
import { json } from './json';
import { touch } from './touch';
import { register } from './register';
import { Clover } from '../Clover';
interface Actions {
    [key: string]: any;
    clone: typeof clone;
    compile: typeof compile;
    copy: typeof copy;
    ensureDir: typeof ensureDir;
    json: typeof json;
    sh: typeof sh;
    touch: typeof touch;
    register: typeof register;
}
declare class Actions {
    protected _clover: () => Clover;
    get clover(): Clover;
    constructor(clover: Clover);
    clone: typeof clone;
    compile: typeof compile;
    copy: typeof copy;
    ensureDir: typeof ensureDir;
    json: typeof json;
    sh: typeof sh;
    touch: typeof touch;
    register: typeof register;
}
export { Actions };
//# sourceMappingURL=index.d.ts.map