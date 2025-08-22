import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

describe('Build output verification', () => {
  const distDir = join(__dirname, '../dist');
  const esmDir = join(distDir, 'esm');

  describe('CommonJS build output', () => {
    it('should generate main CommonJS entry file', () => {
      const mainFile = join(distDir, 'index.js');
      expect(existsSync(mainFile)).toBe(true);
    });

    it('should generate TypeScript declaration files', () => {
      const typesFile = join(distDir, 'index.d.ts');
      expect(existsSync(typesFile)).toBe(true);
    });

    it('should contain CommonJS exports in main file', () => {
      const mainFile = join(distDir, 'index.js');
      if (existsSync(mainFile)) {
        const content = readFileSync(mainFile, 'utf-8');
        // Check for CommonJS patterns (TypeScript compiles to exports.x format)
        expect(content).toMatch(/exports\./);
        expect(content).toMatch(/require\(/);
      }
    });

    it('should export paulTol and japanCUDO objects', () => {
      const typesFile = join(distDir, 'index.d.ts');
      if (existsSync(typesFile)) {
        const content = readFileSync(typesFile, 'utf-8');
        expect(content).toMatch(/export.*paulTol/);
        expect(content).toMatch(/export.*japanCUDO/);
      }
    });
  });

  describe('ES Modules build output', () => {
    it('should generate ES modules entry file', () => {
      const esmFile = join(esmDir, 'index.js');
      expect(existsSync(esmFile)).toBe(true);
    });

    it('should contain ES modules exports', () => {
      const esmFile = join(esmDir, 'index.js');
      if (existsSync(esmFile)) {
        const content = readFileSync(esmFile, 'utf-8');
        // Check for ES modules patterns
        expect(content).toMatch(/export\s+const\s+paulTol/);
        expect(content).toMatch(/export\s+const\s+japanCUDO/);
      }
    });

    it('should have proper ES modules file structure', () => {
      expect(existsSync(join(esmDir, 'palettes'))).toBe(true);
      expect(existsSync(join(esmDir, 'utils'))).toBe(true);
      expect(existsSync(join(esmDir, 'types.js'))).toBe(true);
    });
  });

  describe('Type definitions', () => {
    it('should include comprehensive type exports', () => {
      const typesFile = join(distDir, 'index.d.ts');
      if (existsSync(typesFile)) {
        const content = readFileSync(typesFile, 'utf-8');
        expect(content).toMatch(/PaulTolPalettes/);
        expect(content).toMatch(/JapanCUDOPalettes/);
        expect(content).toMatch(/PaulTolPaletteNames/);
        expect(content).toMatch(/JapanCUDOPaletteNames/);
      }
    });

    it('should provide type safety for palette objects', () => {
      const typesFile = join(distDir, 'index.d.ts');
      if (existsSync(typesFile)) {
        const content = readFileSync(typesFile, 'utf-8');
        // Should export typed palette objects (declare const format from TypeScript compilation)
        expect(content).toMatch(/export\s+declare\s+const\s+paulTol:\s*PaulTolPalettes/);
        expect(content).toMatch(/export\s+declare\s+const\s+japanCUDO:\s*JapanCUDOPalettes/);
      }
    });
  });
});