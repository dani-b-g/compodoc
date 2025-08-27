import { expect } from 'chai';
import * as fs from 'fs-extra';
import { temporaryDir, shell, exists, path } from '../helpers';

const tmp = temporaryDir();

describe('CLI monorepo generation', () => {
    const distFolder = tmp.name + '-monorepo';
    const outputDir = path.resolve(distFolder);
    const fixturePath = path.resolve('test/fixtures/monorepo');
    let run;

    before(function () {
        this.timeout(120000);
        tmp.create(outputDir);
        run = shell('node', ['../../../bin/index-cli.js', '--monorepo', '-d', outputDir], { cwd: fixturePath });
    });
    after(() => tmp.clean(outputDir));

    it('should generate documentation for lib1', () => {
        expect(exists(path.join(outputDir, 'lib1', 'index.html'))).to.be.true;
    });

    it('should generate documentation for lib2', () => {
        expect(exists(path.join(outputDir, 'lib2', 'index.html'))).to.be.true;
    });

    it('should include FooModule import in BarModule page', () => {
        const html = fs.readFileSync(
            path.join(outputDir, 'lib2', 'modules', 'BarModule.html'),
            'utf8'
        );
        expect(html).to.contain('FooModule');
    });
});
