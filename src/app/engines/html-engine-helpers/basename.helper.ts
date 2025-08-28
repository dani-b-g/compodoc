import * as path from 'path';
import { IHtmlEngineHelper } from './html-engine-helper.interface';

export class BasenameHelper implements IHtmlEngineHelper {
    public helperFunc(context: any, filePath: string): string {
        return path.basename(filePath);
    }
}
