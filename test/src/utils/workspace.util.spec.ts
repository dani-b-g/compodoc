import { expect } from 'chai';
import * as fs from 'fs-extra';
import * as os from 'os';
import * as path from 'path';

import { discoverWorkspaces } from '../../../src/utils/workspace.util';

describe('workspace util', () => {
    it('should discover workspace packages from package.json', () => {
        const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'monorepo-'));
        try {
            const packagesDir = path.join(tmp, 'packages');
            fs.ensureDirSync(path.join(packagesDir, 'lib1'));
            fs.writeFileSync(path.join(packagesDir, 'lib1', 'package.json'), '{}');
            fs.ensureDirSync(path.join(packagesDir, 'lib2'));
            fs.writeFileSync(path.join(packagesDir, 'lib2', 'package.json'), '{}');
            fs.writeFileSync(
                path.join(tmp, 'package.json'),
                JSON.stringify({ workspaces: ['packages/*'] })
            );

            const result = discoverWorkspaces(tmp);
            expect(result).to.have.lengthOf(2);
            expect(result).to.include(path.join(packagesDir, 'lib1'));
            expect(result).to.include(path.join(packagesDir, 'lib2'));
        } finally {
            fs.removeSync(tmp);
        }
    });
});
