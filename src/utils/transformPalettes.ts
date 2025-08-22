import { ColorPalette } from '../types';

/**
 * Transform array-based palette structure to object-based structure
 * @param palettes Array of ColorPalette objects
 * @returns Object with palette names as keys and color arrays as values
 */
export function transformPalettesToObject<T extends readonly ColorPalette[]>(
  palettes: T
): Record<T[number]['name'], string[]> {
  const result: Record<string, string[]> = {};
  
  for (const palette of palettes) {
    result[palette.name] = palette.colors;
  }
  
  return result as Record<T[number]['name'], string[]>;
}

/**
 * Transform PaulTol palette array to object structure
 */
export function createPaulTolObject(palettes: readonly ColorPalette[]) {
  return transformPalettesToObject(palettes);
}

/**
 * Transform JapanCUDO palette array to object structure  
 */
export function createJapanCUDOObject(palettes: readonly ColorPalette[]) {
  return transformPalettesToObject(palettes);
}