import { paulTol, japanCUDO } from '../src/index';
import type { 
  PaulTolPalettes, 
  JapanCUDOPalettes, 
  PaulTolPaletteNames, 
  JapanCUDOPaletteNames 
} from '../src/index';

describe('TypeScript type definitions accuracy', () => {
  describe('PaulTol type safety', () => {
    it('should have correct type for paulTol object', () => {
      // Type assertion should not cause compilation errors
      const palette: PaulTolPalettes = paulTol;
      expect(palette).toBeDefined();
    });

    it('should provide type-safe access to all palette names', () => {
      // These should all be valid and type-safe
      const paletteNames: PaulTolPaletteNames[] = [
        'bright', 'highcontrast', 'vibrant', 'muted', 'mediumcontrast',
        'pale', 'dark', 'light', 'discreterainbow', 'sunset', 'nightfall',
        'BuRd', 'PRGn', 'YlOrBr', 'iridescent', 'incandescent', 'smoothrainbow'
      ];

      paletteNames.forEach(name => {
        expect(paulTol[name]).toBeDefined();
        expect(Array.isArray(paulTol[name])).toBe(true);
        expect(paulTol[name].length).toBeGreaterThan(0);
        // Each color should be a valid hex color
        paulTol[name].forEach(color => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });

    it('should provide compile-time type checking for palette access', () => {
      // These should be type-safe without runtime checks
      expect(typeof paulTol.bright).toBe('object');
      expect(typeof paulTol.light).toBe('object');
      expect(typeof paulTol.dark).toBe('object');
      expect(typeof paulTol.muted).toBe('object');
    });
  });

  describe('JapanCUDO type safety', () => {
    it('should have correct type for japanCUDO object', () => {
      // Type assertion should not cause compilation errors
      const palette: JapanCUDOPalettes = japanCUDO;
      expect(palette).toBeDefined();
    });

    it('should provide type-safe access to palette names', () => {
      const paletteNames: JapanCUDOPaletteNames[] = ['accent', 'base'];

      paletteNames.forEach(name => {
        expect(japanCUDO[name]).toBeDefined();
        expect(Array.isArray(japanCUDO[name])).toBe(true);
        expect(japanCUDO[name].length).toBeGreaterThan(0);
        // Each color should be a valid hex color
        japanCUDO[name].forEach(color => {
          expect(color).toMatch(/^#[0-9A-F]{6}$/i);
        });
      });
    });
  });

  describe('Type completeness', () => {
    it('should export all necessary types', () => {
      // This test ensures all type exports are available
      // If any type is missing, TypeScript compilation will fail
      
      // Test that we can create typed variables
      let paulTolPalettes: PaulTolPalettes;
      let japanCUDOPalettes: JapanCUDOPalettes;
      let paulTolName: PaulTolPaletteNames;
      let japanCUDOName: JapanCUDOPaletteNames;

      // Assignment should work without type errors
      paulTolPalettes = paulTol;
      japanCUDOPalettes = japanCUDO;
      paulTolName = 'bright';
      japanCUDOName = 'accent';

      expect(paulTolPalettes).toBeDefined();
      expect(japanCUDOPalettes).toBeDefined();
      expect(paulTolName).toBe('bright');
      expect(japanCUDOName).toBe('accent');
    });

    it('should maintain type consistency between data and types', () => {
      // Verify that the actual data matches the type definitions
      const paulTolKeys = Object.keys(paulTol) as PaulTolPaletteNames[];
      const japanCUDOKeys = Object.keys(japanCUDO) as JapanCUDOPaletteNames[];

      // All keys should be valid palette names
      paulTolKeys.forEach(key => {
        expect(paulTol[key]).toBeDefined();
        expect(Array.isArray(paulTol[key])).toBe(true);
      });

      japanCUDOKeys.forEach(key => {
        expect(japanCUDO[key]).toBeDefined();
        expect(Array.isArray(japanCUDO[key])).toBe(true);
      });
    });
  });

  describe('Type inference and IntelliSense support', () => {
    it('should support proper autocompletion for palette properties', () => {
      // These accesses should have full IntelliSense support
      const brightColors = paulTol.bright;
      const lightColors = paulTol.light;
      const accentColors = japanCUDO.accent;
      const baseColors = japanCUDO.base;

      expect(brightColors).toBeDefined();
      expect(lightColors).toBeDefined();
      expect(accentColors).toBeDefined();
      expect(baseColors).toBeDefined();

      // Type should be inferred as string[]
      expect(Array.isArray(brightColors)).toBe(true);
      expect(Array.isArray(lightColors)).toBe(true);
      expect(Array.isArray(accentColors)).toBe(true);
      expect(Array.isArray(baseColors)).toBe(true);
    });

    it('should provide type safety for invalid property access', () => {
      // TypeScript should catch these at compile time
      // We can't test compile-time errors in Jest, but we can verify runtime behavior
      
      // These would be TypeScript errors in real usage
      const invalidPaulTol = (paulTol as any).invalidPalette;
      const invalidJapanCUDO = (japanCUDO as any).invalidPalette;

      expect(invalidPaulTol).toBeUndefined();
      expect(invalidJapanCUDO).toBeUndefined();
    });
  });
});