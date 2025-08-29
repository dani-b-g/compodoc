import { expect } from 'chai';
import * as fs from 'fs-extra';
import { temporaryDir, shell, exists, path } from '../helpers';

const tmp = temporaryDir();

describe('CLI monorepo generation', () => {
    const distFolder = tmp.name + '-monorepo';
    const outputDir = path.resolve(distFolder);
    const fixturePath = path.resolve('test/fixtures/monorepo');

    before(function () {
        this.timeout(120000);
        tmp.create(outputDir);
        shell('node', ['../../../bin/index-cli.js', '--monorepo', '-d', outputDir], {
            cwd: fixturePath
        });
    });
    after(() => tmp.clean(outputDir));

    it('should generate documentation for lib1', () => {
        expect(exists(path.join(outputDir, 'lib1', 'index.html'))).to.be.true;
    });

    it('should generate documentation for lib2', () => {
        expect(exists(path.join(outputDir, 'lib2', 'index.html'))).to.be.true;
    });

    it('should generate libraries index with links', () => {
        const indexPath = path.join(outputDir, 'libs-index.html');
        expect(exists(indexPath)).to.be.true;
        const html = fs.readFileSync(indexPath, 'utf8');
        expect(html).to.contain('lib1/index.html');
        expect(html).to.contain('lib2/index.html');
    });

    it('should include FooModule import in BarModule page', () => {
        const html = fs.readFileSync(
            path.join(outputDir, 'lib2', 'modules', 'BarModule.html'),
            'utf8'
        );
        expect(html).to.contain('FooModule');
    });

    it('should style internal vs external dependencies in graph', () => {
        const svg = fs.readFileSync(
            path.join(outputDir, 'lib2', 'modules', 'BarModule', 'dependencies.svg'),
            'utf8'
        );
        expect(svg).to.contain('#33a02c');
        expect(svg).to.contain('#e31a1c');
    });
});

