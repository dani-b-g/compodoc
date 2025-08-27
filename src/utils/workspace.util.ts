import * as fs from 'fs-extra';
import * as path from 'path';

const fg = require('fast-glob');

export function discoverWorkspaces(root: string): string[] {
    let patterns: string[] = [];
    const lernaFile = path.join(root, 'lerna.json');
    if (fs.existsSync(lernaFile)) {
        try {
            const lerna = fs.readJsonSync(lernaFile);
            if (Array.isArray(lerna.packages)) {
                patterns = lerna.packages;
            }
        } catch {}
    }

    if (patterns.length === 0) {
        const pkgFile = path.join(root, 'package.json');
        if (fs.existsSync(pkgFile)) {
            try {
                const pkg = fs.readJsonSync(pkgFile);
                if (Array.isArray(pkg.workspaces)) {
                    patterns = pkg.workspaces;
                } else if (pkg.workspaces && Array.isArray(pkg.workspaces.packages)) {
                    patterns = pkg.workspaces.packages;
                }
            } catch {}
        }
    }

    if (patterns.length === 0) {
        return [];
    }

    const dirs: string[] = fg.sync(patterns, {
        cwd: root,
        onlyDirectories: true,
        absolute: true
    });

    return dirs.filter(dir => fs.existsSync(path.join(dir, 'package.json')));
}

export default { discoverWorkspaces };
