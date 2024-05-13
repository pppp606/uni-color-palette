import { getColorsByPaletteName } from '../src/index';
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
