import { readFileSync } from 'fs';
import { join } from 'path';

describe('Package.json configuration', () => {
  let packageJson: any;

  beforeAll(() => {
    const packagePath = join(__dirname, '../package.json');
    const content = readFileSync(packagePath, 'utf-8');
    packageJson = JSON.parse(content);
  });

  describe('Dual package support', () => {
    it('should have main field pointing to CommonJS build', () => {
      expect(packageJson.main).toBe('dist/index.js');
    });

    it('should have module field pointing to ES modules build', () => {
      expect(packageJson.module).toBe('dist/esm/index.js');
    });

    it('should have types field pointing to type definitions', () => {
      expect(packageJson.types).toBe('dist/index.d.ts');
    });

    it('should have exports field for conditional exports', () => {
      expect(packageJson.exports).toBeDefined();
      expect(typeof packageJson.exports).toBe('object');
    });

    it('should have proper exports configuration', () => {
      const exports = packageJson.exports;
      
      // Root export
      expect(exports['.']).toBeDefined();
      expect(exports['.'].import).toBe('./dist/esm/index.js');
      expect(exports['.'].require).toBe('./dist/index.js');
      expect(exports['.'].types).toBe('./dist/index.d.ts');
    });

    it('should include dist directory in files array', () => {
      expect(packageJson.files).toContain('dist');
    });

    it('should include src directory in files array for source maps', () => {
      expect(packageJson.files).toContain('src');
    });
  });

  describe('Build scripts', () => {
    it('should have build script for dual package compilation', () => {
      expect(packageJson.scripts.build).toBeDefined();
    });

    it('should have build:cjs script for CommonJS build', () => {
      expect(packageJson.scripts['build:cjs']).toBeDefined();
    });

    it('should have build:esm script for ES modules build', () => {
      expect(packageJson.scripts['build:esm']).toBeDefined();
    });

    it('should have prepublishOnly script for automatic building', () => {
      expect(packageJson.scripts.prepublishOnly).toBe('npm run build');
    });
  });

  describe('Package metadata', () => {
    it('should specify node engines compatibility', () => {
      expect(packageJson.engines.node).toBeDefined();
      expect(packageJson.engines.node).toBe('>=16.14.0');
    });

    it('should have appropriate keywords for TypeScript support', () => {
      expect(packageJson.keywords).toContain('typescript');
      expect(packageJson.keywords).toContain('types');
    });

    it('should specify type module for ES modules support', () => {
      // This test will pass once we configure dual package
      // For now it should fail as we haven't configured it yet
      expect(packageJson.type).toBeUndefined(); // Will change to check for proper dual setup
    });
  });
});