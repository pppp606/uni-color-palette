# 🎨 uni-color-palette

[![npm version](https://badge.fury.io/js/@pppp606%2Funi-color-palette.svg)](https://badge.fury.io/js/@pppp606%2Funi-color-palette)
[![CI](https://github.com/pppp606/uni-color-palette/workflows/CI/badge.svg)](https://github.com/pppp606/uni-color-palette/actions)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

A modern, lightweight TypeScript library providing organized color palettes based on principles of universal design. This library allows developers to efficiently access scientifically-designed color schemes for UI/UX projects with full type safety and IDE support.

## ✨ Features

- 🎯 **Object-based API** - Direct access to color palettes (`paulTol.light.blue`)
- 📘 **Full TypeScript support** - Comprehensive type definitions with IDE autocompletion
- 📦 **Dual package format** - Supports both CommonJS and ES Modules
- 🧪 **Scientifically designed** - Based on Paul Tol's research and universal design principles
- ♿ **Accessibility focused** - Color schemes designed for colorblind accessibility
- 🚀 **Zero dependencies** - Lightweight and fast

## 📦 Installation

```bash
npm install @pppp606/uni-color-palette
```

or

```bash
yarn add @pppp606/uni-color-palette
```

## 🚀 Quick Start

### Modern Object-based API (Recommended)

```typescript
import { paulTol, japanCUDO } from '@pppp606/uni-color-palette';

// Direct access to color palettes
const lightBlue = paulTol.light[4];        // "#99DDFF"
const brightRed = paulTol.bright[1];       // "#EE6677"
const accentRed = japanCUDO.accent[0];     // "#ff4b00"

// Full palette access
const lightPalette = paulTol.light;        // Array of 9 colors
const darkPalette = paulTol.dark;          // Array of 6 colors
```

### Legacy Function-based API (Backward Compatible)

```typescript
import { getColorsByPaletteName } from '@pppp606/uni-color-palette';

// Legacy API still supported
const colors = getColorsByPaletteName('PaulTol', 'bright');
// ["#4477AA", "#EE6677", "#228833", "#CCBB44", "#66CCEE", "#AA3377", "#BBBBBB"]
```

### Type Safety

```typescript
import type { PaulTolPalettes, PaulTolPaletteNames } from '@pppp606/uni-color-palette';

// Full type safety and IDE autocompletion
const palette: PaulTolPalettes = paulTol;
const paletteName: PaulTolPaletteNames = 'bright'; // Autocompleted!
```

## 📚 Available Palettes

### Paul Tol Palettes

Scientific color schemes designed by Paul Tol for accessibility and clarity:

```typescript
// Qualitative palettes (distinct colors)
paulTol.bright          // 7 colors - High contrast, vibrant
paulTol.highcontrast    // 3 colors - Maximum distinction
paulTol.vibrant         // 7 colors - Colorful but distinct
paulTol.muted           // 10 colors - Subtle, professional
paulTol.mediumcontrast  // 6 colors - Balanced contrast
paulTol.pale            // 6 colors - Light, soft tones
paulTol.dark            // 6 colors - Deep, rich tones
paulTol.light           // 9 colors - Bright, airy tones

// Sequential palettes (gradients)
paulTol.sunset          // 11 colors - Warm sunset gradient
paulTol.nightfall       // 17 colors - Cool evening gradient
paulTol.iridescent      // 23 colors - Iridescent rainbow
paulTol.incandescent    // 11 colors - Fire-like gradient
paulTol.discreterainbow // 29 colors - Full spectrum
paulTol.smoothrainbow   // 34 colors - Smooth color progression

// Diverging palettes (contrasting ends)
paulTol.BuRd            // 9 colors - Blue to Red
paulTol.PRGn            // 9 colors - Purple to Green
paulTol.YlOrBr          // 9 colors - Yellow to Brown
```

### Japan CUDO Palettes

Color universal design recommended by Japan CUDO organization:

```typescript
japanCUDO.accent        // 9 colors - High visibility accent colors
japanCUDO.base          // 7 colors - Soft base colors for backgrounds
```

## 🔄 Migration Guide

### Migrating from v1.x to v2.x

**v2.0.0 introduces breaking changes** with a new object-based API. Here's how to migrate:

#### Before (v1.x)
```typescript
import { getColorsByPaletteName } from '@pppp606/uni-color-palette';

const brightColors = getColorsByPaletteName('PaulTol', 'bright');
const firstColor = brightColors[0]; // "#4477AA"
```

#### After (v2.x) - Recommended
```typescript
import { paulTol } from '@pppp606/uni-color-palette';

const brightColors = paulTol.bright;
const firstColor = paulTol.bright[0]; // "#4477AA"
```

#### After (v2.x) - Legacy Support
```typescript
// Legacy function still available for backward compatibility
import { getColorsByPaletteName } from '@pppp606/uni-color-palette';

const brightColors = getColorsByPaletteName('PaulTol', 'bright'); // Still works!
```

### Benefits of the New API

- ✅ **Better IntelliSense**: IDE autocompletion for all palette names
- ✅ **Type Safety**: Compile-time checking of palette names
- ✅ **Simpler Syntax**: Direct access without function calls
- ✅ **Better Performance**: No runtime palette lookups

## 🛠️ Usage Examples

### React Component Example

```tsx
import React from 'react';
import { paulTol } from '@pppp606/uni-color-palette';

const ColorfulButton: React.FC<{ variant: 'primary' | 'secondary' }> = ({ variant, children }) => {
  const colors = variant === 'primary' ? paulTol.bright : paulTol.muted;
  
  return (
    <button
      style={{
        backgroundColor: colors[0],
        color: 'white',
        border: `2px solid ${colors[1]}`,
        padding: '8px 16px',
        borderRadius: '4px'
      }}
    >
      {children}
    </button>
  );
};
```

### CSS Variables Generation

```typescript
import { paulTol, japanCUDO } from '@pppp606/uni-color-palette';

// Generate CSS custom properties
const generateCSSVariables = () => {
  const css: string[] = [':root {'];
  
  // Paul Tol colors
  paulTol.bright.forEach((color, index) => {
    css.push(`  --color-bright-${index + 1}: ${color};`);
  });
  
  // Japan CUDO colors
  japanCUDO.accent.forEach((color, index) => {
    css.push(`  --color-accent-${index + 1}: ${color};`);
  });
  
  css.push('}');
  return css.join('\n');
};
```

### Data Visualization

```typescript
import { paulTol } from '@pppp606/uni-color-palette';

// Chart.js configuration
const chartConfig = {
  data: {
    datasets: [{
      data: [65, 59, 80, 81, 56, 55, 40],
      backgroundColor: paulTol.bright,
      borderColor: paulTol.dark,
    }]
  }
};

// D3.js color scale
const colorScale = d3.scaleOrdinal()
  .domain(['A', 'B', 'C', 'D', 'E'])
  .range(paulTol.muted);
```

## Color Examples
https://pppp606.github.io/uni-color-palette/

## 🔧 Development

### Building from Source

```bash
# Clone the repository
git clone https://github.com/pppp606/uni-color-palette.git
cd uni-color-palette

# Install dependencies
npm install

# Build the project
npm run build

# Run tests
npm test

# Run linting
npm run eslint
```

### Project Structure

```
uni-color-palette/
├── src/
│   ├── index.ts              # Main API exports
│   ├── types.ts              # TypeScript type definitions
│   ├── palettes/             # Color palette data
│   │   ├── paulTol.ts        # Paul Tol palettes
│   │   └── japanCUDO.ts      # Japan CUDO palettes
│   └── utils/                # Utility functions
├── dist/                     # CommonJS build output
├── dist/esm/                 # ES Modules build output
├── test/                     # Test files
└── .github/workflows/        # CI/CD workflows
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Adding New Palettes

1. Create a new palette file in `src/palettes/`
2. Add proper TypeScript types in `src/types.ts`
3. Export the palette in `src/index.ts`
4. Add comprehensive tests
5. Update documentation

### Generate Color Examples

```bash
# Add a new color file to src/palettes
# Then run:
npm run generate-examples
```

## 📄 License

MIT License - see [LICENSE](LICENSE.txt) for details.

## 🙏 Acknowledgments

### Paul Tol's Scientific Color Schemes
This library implements color palettes designed by **Paul Tol** based on scientific research for optimal accessibility and visual clarity.

- **Source**: [Paul Tol's Notes](https://personal.sron.nl/~pault/)
- **Research**: SRON Netherlands Institute for Space Research
- **Focus**: Colorblind-friendly, scientifically optimized palettes

### Japan CUDO (Color Universal Design Organization)
Japan CUDO provides color schemes specifically designed for universal accessibility.

- **Source**: [Japan CUDO Color Schemes](https://cudo.jp/?page_id=1565)  
- **Focus**: Universal design principles for Japanese accessibility standards

## 📊 Related Projects

- [Paul Tol's Colour Schemes](https://personal.sron.nl/~pault/) - Original research and documentation
- [colorbrewer2.org](https://colorbrewer2.org/) - Color advice for cartography
- [Viz Palette](https://projects.susielu.com/viz-palette) - Color palette analysis tool
