import { IHtmlEngineHelper } from './html-engine-helper.interface';

export class BasenameHelper implements IHtmlEngineHelper {
    public helperFunc(context: any, value: string): string {
        if (!value) return '';
        // Normalize Windows backslashes to forward slashes
        const norm = value.replace(/\\/g, '/');
        const parts = norm.split('/').filter(Boolean);
        return parts.length ? parts[parts.length - 1] : norm;
    }
}

