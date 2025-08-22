export type ColorPalette = {
  name: string;
  colors: string[];
}

export type PaletteGroupName = 'PaulTol' | 'JapanCUDO';

// Type definitions for object-based API
export type PaulTolPaletteNames = 
  | 'bright' 
  | 'highcontrast' 
  | 'vibrant' 
  | 'muted' 
  | 'mediumcontrast' 
  | 'pale' 
  | 'dark' 
  | 'light' 
  | 'discreterainbow' 
  | 'sunset' 
  | 'nightfall' 
  | 'BuRd' 
  | 'PRGn' 
  | 'YlOrBr' 
  | 'iridescent' 
  | 'incandescent' 
  | 'smoothrainbow';

export type JapanCUDOPaletteNames = 'accent' | 'base';

export type PaulTolPalettes = Record<PaulTolPaletteNames, string[]>;
export type JapanCUDOPalettes = Record<JapanCUDOPaletteNames, string[]>;
