# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [2.0.0] - 2025-01-22

### 🎉 Major Release - Complete TypeScript Rewrite

This is a **major release** with **breaking changes**. The library has been completely rewritten to provide a modern, type-safe API with comprehensive TypeScript support.

### ✨ Added

#### New Object-based API
- **Direct palette access**: Use `paulTol.light.blue` instead of `getColorsByPaletteName('PaulTol', 'light')`
- **IDE autocompletion**: Full IntelliSense support for all palette names and colors
- **Type safety**: Compile-time checking with comprehensive TypeScript types

#### Comprehensive TypeScript Support
- **Full type definitions**: Complete TypeScript `.d.ts` files with proper exports
- **Type exports**: `PaulTolPalettes`, `JapanCUDOPalettes`, `PaulTolPaletteNames`, `JapanCUDOPaletteNames`
- **IDE integration**: Perfect autocompletion and type checking in VS Code, WebStorm, etc.

#### Dual Package Format
- **ES Modules support**: Native ESM with `import` statements
- **CommonJS support**: Traditional `require()` statements  
- **Conditional exports**: Automatic format selection based on import method
- **Node.js compatibility**: Supports Node.js 16.14.0+

#### Modern Build System
- **Dual compilation**: Separate builds for CommonJS (`dist/`) and ES Modules (`dist/esm/`)
- **Source maps**: Full debugging support with generated source maps
- **Declaration maps**: Enhanced IDE navigation to source code

#### CI/CD Automation
- **GitHub Actions**: Automated testing on Node.js 18, 20, and 22
- **Automated publishing**: Automatic npm releases on version tags
- **Build verification**: Comprehensive build output validation
- **Quality gates**: TypeScript checking, linting, and testing

#### Enhanced Documentation
- **Comprehensive README**: Updated with modern examples and migration guide
- **Usage examples**: React, CSS variables, data visualization examples
- **Migration guide**: Step-by-step upgrade instructions from v1.x
- **API documentation**: Complete palette documentation with descriptions

#### Testing Infrastructure
- **63 comprehensive tests**: Complete test coverage across all functionality
- **Integration testing**: CommonJS, ESM, and TypeScript compatibility tests
- **Build verification**: Automated testing of package structure and exports
- **Type safety tests**: Validation of TypeScript type accuracy

### 🔄 Changed

#### Breaking Changes
- **API redesign**: Function-based API replaced with object-based API
  - **Before**: `getColorsByPaletteName('PaulTol', 'bright')`
  - **After**: `paulTol.bright`
- **Import changes**: Direct named imports now available
  - **Before**: `import { getColorsByPaletteName } from '@pppp606/uni-color-palette'`
  - **After**: `import { paulTol, japanCUDO } from '@pppp606/uni-color-palette'`
- **Package structure**: New dual package format with conditional exports

#### Improvements
- **Performance**: Eliminated runtime palette lookups with direct object access
- **Developer experience**: Significantly improved with TypeScript and IDE support
- **Package size**: Optimized build output with tree-shaking support
- **Accessibility**: Enhanced documentation of color accessibility features

### 🔧 Technical Changes

#### Build System
- **TypeScript 5.4.5**: Latest TypeScript with advanced type features
- **Dual tsconfig**: Separate configurations for CommonJS and ES Modules
- **Build scripts**: `npm run build:cjs` and `npm run build:esm`
- **Prepublish hook**: Automatic building before npm publish

#### Package Configuration  
- **Enhanced package.json**: Proper `main`, `module`, `types`, and `exports` fields
- **Files specification**: Optimized package contents with `dist` and `src` inclusion
- **Engine requirements**: Node.js 16.14.0+ for modern JavaScript features

#### Development Infrastructure
- **Jest testing**: Comprehensive test suite with ts-jest integration
- **GitHub Actions**: CI/CD workflows for testing and publishing
- **ESLint/Prettier**: Code quality and formatting tools (optional)

### 📦 Migration

#### Automatic Migration (Recommended)
```typescript
// Old v1.x API
import { getColorsByPaletteName } from '@pppp606/uni-color-palette';
const colors = getColorsByPaletteName('PaulTol', 'bright');

// New v2.x API  
import { paulTol } from '@pppp606/uni-color-palette';
const colors = paulTol.bright;
```

#### Backward Compatibility
The legacy `getColorsByPaletteName` function is still available for gradual migration:

```typescript
// This still works in v2.x
import { getColorsByPaletteName } from '@pppp606/uni-color-palette';
const colors = getColorsByPaletteName('PaulTol', 'bright');
```

### 🐛 Fixed
- **Module resolution**: Proper ES Modules support with correct file extensions
- **Type accuracy**: Fixed all TypeScript type inconsistencies
- **Package exports**: Correct conditional exports for different environments
- **Build reliability**: Consistent build outputs across different systems

### 🧪 Testing
- **API structure tests**: 17 tests validating object-based API
- **Package configuration**: 10 tests for dual package setup
- **Build output verification**: 9 tests for build system validation
- **Type definitions**: 9 tests for TypeScript type accuracy
- **CI/CD workflows**: 9 tests for automation pipeline
- **Integration testing**: 9 tests for real-world compatibility

## [1.0.0] - Previous Release

### Initial release with function-based API
- Basic color palette access via `getColorsByPaletteName()`
- Paul Tol and Japan CUDO color schemes
- JavaScript support without TypeScript types