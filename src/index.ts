import { ColorPalette, PaletteGroupName } from './types';
import { PaulTol } from './palettes/paulTol';
import { JapanCUDO } from './palettes/japanCUDO';
import { transformPalettesToObject } from './utils/transformPalettes';

// Legacy function-based API (kept for backward compatibility during transition)
export const getColorsByPaletteName = (paletteGroupName: PaletteGroupName, paletteName: string): string[] | null => {
  let paletteGroup: ColorPalette[] | null = null;
  switch (paletteGroupName) {
    case 'PaulTol':
      paletteGroup = PaulTol;
      break;
    case 'JapanCUDO':
      paletteGroup = JapanCUDO;
      break;
    default:
      return null;
  }

  const palette = paletteGroup.find((p) => p.name === paletteName);

  if (palette) {
    return palette.colors;
  } else {
    return null;
  }
}

// New object-based API exports
export const paulTol = transformPalettesToObject(PaulTol);
export const japanCUDO = transformPalettesToObject(JapanCUDO);
