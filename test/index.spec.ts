import { getColorsByPaletteName, paulTol, japanCUDO } from '../src/index';
import { PaulTol } from '../src/palettes/paulTol';

describe('getColorsByPaletteName function', () => {
  it('should return colors for a valid palette group and palette name', () => {
    // テストデータ
    const paletteGroupName = 'PaulTol';
    const paletteName = 'bright';
    const expectedColors = PaulTol.find((p) => p.name === paletteName)?.colors;
    const colors = getColorsByPaletteName(paletteGroupName, paletteName);

    expect(colors).toEqual(expectedColors);
  });

  it('should return null for a valid palette group but invalid palette name', () => {
    // テストデータ
    const paletteGroupName = 'PaulTol';
    const paletteName = 'invalidPaletteName';
    const colors = getColorsByPaletteName(paletteGroupName, paletteName);

    expect(colors).toBeNull();
  });
});

describe('Object-based API structure', () => {
  describe('PaulTol palette', () => {
    it('should provide access to light palette colors', () => {
      expect(paulTol.light).toBeDefined();
      expect(Array.isArray(paulTol.light)).toBe(true);
      expect(paulTol.light.length).toBeGreaterThan(0);
      expect(paulTol.light[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to dark palette colors', () => {
      expect(paulTol.dark).toBeDefined();
      expect(Array.isArray(paulTol.dark)).toBe(true);
      expect(paulTol.dark.length).toBeGreaterThan(0);
      expect(paulTol.dark[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to bright palette colors', () => {
      expect(paulTol.bright).toBeDefined();
      expect(Array.isArray(paulTol.bright)).toBe(true);
      expect(paulTol.bright.length).toBeGreaterThan(0);
      expect(paulTol.bright[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to muted palette colors', () => {
      expect(paulTol.muted).toBeDefined();
      expect(Array.isArray(paulTol.muted)).toBe(true);
      expect(paulTol.muted.length).toBeGreaterThan(0);
      expect(paulTol.muted[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to vibrant palette colors', () => {
      expect(paulTol.vibrant).toBeDefined();
      expect(Array.isArray(paulTol.vibrant)).toBe(true);
      expect(paulTol.vibrant.length).toBeGreaterThan(0);
      expect(paulTol.vibrant[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to pale palette colors', () => {
      expect(paulTol.pale).toBeDefined();
      expect(Array.isArray(paulTol.pale)).toBe(true);
      expect(paulTol.pale.length).toBeGreaterThan(0);
      expect(paulTol.pale[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to highcontrast palette colors', () => {
      expect(paulTol.highcontrast).toBeDefined();
      expect(Array.isArray(paulTol.highcontrast)).toBe(true);
      expect(paulTol.highcontrast.length).toBeGreaterThan(0);
      expect(paulTol.highcontrast[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to mediumcontrast palette colors', () => {
      expect(paulTol.mediumcontrast).toBeDefined();
      expect(Array.isArray(paulTol.mediumcontrast)).toBe(true);
      expect(paulTol.mediumcontrast.length).toBeGreaterThan(0);
      expect(paulTol.mediumcontrast[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to sequential palette colors', () => {
      expect(paulTol.discreterainbow).toBeDefined();
      expect(Array.isArray(paulTol.discreterainbow)).toBe(true);
      expect(paulTol.discreterainbow.length).toBeGreaterThan(0);
      expect(paulTol.discreterainbow[0]).toMatch(/^#[0-9A-F]{6}$/i);

      expect(paulTol.sunset).toBeDefined();
      expect(Array.isArray(paulTol.sunset)).toBe(true);
      expect(paulTol.sunset.length).toBeGreaterThan(0);
      expect(paulTol.sunset[0]).toMatch(/^#[0-9A-F]{6}$/i);

      expect(paulTol.nightfall).toBeDefined();
      expect(Array.isArray(paulTol.nightfall)).toBe(true);
      expect(paulTol.nightfall.length).toBeGreaterThan(0);
      expect(paulTol.nightfall[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to diverging palette colors', () => {
      expect(paulTol.BuRd).toBeDefined();
      expect(Array.isArray(paulTol.BuRd)).toBe(true);
      expect(paulTol.BuRd.length).toBeGreaterThan(0);
      expect(paulTol.BuRd[0]).toMatch(/^#[0-9A-F]{6}$/i);

      expect(paulTol.PRGn).toBeDefined();
      expect(Array.isArray(paulTol.PRGn)).toBe(true);
      expect(paulTol.PRGn.length).toBeGreaterThan(0);
      expect(paulTol.PRGn[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to special palette colors', () => {
      expect(paulTol.iridescent).toBeDefined();
      expect(Array.isArray(paulTol.iridescent)).toBe(true);
      expect(paulTol.iridescent.length).toBeGreaterThan(0);
      expect(paulTol.iridescent[0]).toMatch(/^#[0-9A-F]{6}$/i);

      expect(paulTol.incandescent).toBeDefined();
      expect(Array.isArray(paulTol.incandescent)).toBe(true);
      expect(paulTol.incandescent.length).toBeGreaterThan(0);
      expect(paulTol.incandescent[0]).toMatch(/^#[0-9A-F]{6}$/i);

      expect(paulTol.smoothrainbow).toBeDefined();
      expect(Array.isArray(paulTol.smoothrainbow)).toBe(true);
      expect(paulTol.smoothrainbow.length).toBeGreaterThan(0);
      expect(paulTol.smoothrainbow[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('JapanCUDO palette', () => {
    it('should provide access to accent palette colors', () => {
      expect(japanCUDO.accent).toBeDefined();
      expect(Array.isArray(japanCUDO.accent)).toBe(true);
      expect(japanCUDO.accent.length).toBeGreaterThan(0);
      expect(japanCUDO.accent[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });

    it('should provide access to base palette colors', () => {
      expect(japanCUDO.base).toBeDefined();
      expect(Array.isArray(japanCUDO.base)).toBe(true);
      expect(japanCUDO.base.length).toBeGreaterThan(0);
      expect(japanCUDO.base[0]).toMatch(/^#[0-9A-F]{6}$/i);
    });
  });

  describe('Type safety and structure', () => {
    it('should have all expected properties on paulTol object', () => {
      const expectedPaulTolProperties = [
        'bright', 'highcontrast', 'vibrant', 'muted', 'mediumcontrast', 
        'pale', 'dark', 'light', 'discreterainbow', 'sunset', 'nightfall', 
        'BuRd', 'PRGn', 'YlOrBr', 'iridescent', 'incandescent', 'smoothrainbow'
      ];
      
      expectedPaulTolProperties.forEach(prop => {
        expect(paulTol).toHaveProperty(prop);
        expect(Array.isArray(paulTol[prop as keyof typeof paulTol])).toBe(true);
      });
    });

    it('should have all expected properties on japanCUDO object', () => {
      const expectedJapanCUDOProperties = ['accent', 'base'];
      
      expectedJapanCUDOProperties.forEach(prop => {
        expect(japanCUDO).toHaveProperty(prop);
        expect(Array.isArray(japanCUDO[prop as keyof typeof japanCUDO])).toBe(true);
      });
    });
  });
});
