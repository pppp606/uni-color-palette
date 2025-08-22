import { spawn } from 'child_process';
import { writeFileSync, mkdirSync, rmSync, existsSync } from 'fs';
import { join } from 'path';

describe('Integration tests for dual package support', () => {
  const testDir = join(__dirname, '../integration-test-temp');
  
  beforeAll(async () => {
    // Build the package first
    await runCommand('npm run build');
  });

  beforeEach(() => {
    // Clean up and create test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
    mkdirSync(testDir, { recursive: true });
  });

  afterAll(() => {
    // Clean up test directory
    if (existsSync(testDir)) {
      rmSync(testDir, { recursive: true });
    }
  });

  describe('CommonJS import compatibility', () => {
    it('should work with require() syntax', async () => {
      const testFile = join(testDir, 'test-cjs.js');
      const testCode = `
const { paulTol, japanCUDO, getColorsByPaletteName } = require('../dist/index.js');

console.log('Testing CommonJS imports...');

// Test new object-based API
if (!paulTol || !paulTol.light || !Array.isArray(paulTol.light)) {
  throw new Error('paulTol.light not available');
}

if (!japanCUDO || !japanCUDO.accent || !Array.isArray(japanCUDO.accent)) {
  throw new Error('japanCUDO.accent not available');
}

// Test legacy function-based API
const brightColors = getColorsByPaletteName('PaulTol', 'bright');
if (!brightColors || !Array.isArray(brightColors)) {
  throw new Error('getColorsByPaletteName not working');
}

// Verify color format
if (!paulTol.light[0].match(/^#[0-9A-F]{6}$/i)) {
  throw new Error('Invalid color format');
}

console.log('✅ CommonJS import test passed');
console.log('Paul Tol light palette has', paulTol.light.length, 'colors');
console.log('Japan CUDO accent palette has', japanCUDO.accent.length, 'colors');
console.log('First light color:', paulTol.light[0]);
`;

      writeFileSync(testFile, testCode);
      
      const result = await runCommand(`node ${testFile}`);
      expect(result.stdout).toContain('✅ CommonJS import test passed');
      expect(result.stdout).toContain('Paul Tol light palette has');
      expect(result.stdout).toContain('First light color: #');
    }, 10000);
  });

  describe('ES Modules import compatibility', () => {
    it('should have valid ES module structure', async () => {
      // Test that ES module files exist and have valid syntax
      const esmIndexPath = join(__dirname, '../dist/esm/index.js');
      const esmPalettePath = join(__dirname, '../dist/esm/palettes/paulTol.js');
      
      expect(existsSync(esmIndexPath)).toBe(true);
      expect(existsSync(esmPalettePath)).toBe(true);
      
      // Check that files use ES module syntax
      const esmContent = require('fs').readFileSync(esmIndexPath, 'utf-8');
      expect(esmContent).toMatch(/export const paulTol/);
      expect(esmContent).toMatch(/import.*from/);
      
      console.log('✅ ES Modules structure verified');
    });
  });

  describe('TypeScript import compatibility', () => {
    it('should work with TypeScript imports', async () => {
      const testFile = join(testDir, 'test-ts.ts');
      const testCode = `
import { paulTol, japanCUDO, getColorsByPaletteName, PaulTolPalettes, JapanCUDOPalettes } from '../dist/index.js';

console.log('Testing TypeScript imports...');

// Test type safety
const palettes: PaulTolPalettes = paulTol;
const japanPalettes: JapanCUDOPalettes = japanCUDO;

// Test new object-based API with proper typing
const lightColors: string[] = paulTol.light;
const accentColors: string[] = japanCUDO.accent;

if (!lightColors || !Array.isArray(lightColors)) {
  throw new Error('paulTol.light not available');
}

if (!accentColors || !Array.isArray(accentColors)) {
  throw new Error('japanCUDO.accent not available');
}

// Test legacy function-based API
const brightColors = getColorsByPaletteName('PaulTol', 'bright');
if (!brightColors || !Array.isArray(brightColors)) {
  throw new Error('getColorsByPaletteName not working');
}

console.log('✅ TypeScript import test passed');
console.log('Types are working correctly');
`;

      writeFileSync(testFile, testCode);
      
      // Compile and run TypeScript
      await runCommand(`npx tsc --target ES2020 --module commonjs --moduleResolution node --esModuleInterop ${testFile}`);
      const jsFile = testFile.replace('.ts', '.js');
      const result = await runCommand(`node ${jsFile}`);
      
      expect(result.stdout).toContain('✅ TypeScript import test passed');
      expect(result.stdout).toContain('Types are working correctly');
    }, 15000);
  });

  describe('Package.json conditional exports validation', () => {
    it('should have proper export configuration for dual package', async () => {
      // Test that package.json has correct export configuration
      const packageJsonPath = join(__dirname, '../package.json');
      const content = require('fs').readFileSync(packageJsonPath, 'utf-8');
      const packageConfig = JSON.parse(content);
      
      expect(packageConfig.exports).toBeDefined();
      expect(packageConfig.exports['.']).toBeDefined();
      expect(packageConfig.exports['.'].import).toBe('./dist/esm/index.js');
      expect(packageConfig.exports['.'].require).toBe('./dist/index.js');
      expect(packageConfig.exports['.'].types).toBe('./dist/index.d.ts');
      
      console.log('✅ Export configuration validated');
    });
  });
});

// Helper function to run shell commands
function runCommand(command: string): Promise<{ stdout: string; stderr: string; code: number }> {
  return new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    const child = spawn(cmd, args, { 
      stdio: 'pipe',
      shell: true,
      cwd: join(__dirname, '..')
    });
    
    let stdout = '';
    let stderr = '';
    
    child.stdout?.on('data', (data) => {
      stdout += data.toString();
    });
    
    child.stderr?.on('data', (data) => {
      stderr += data.toString();
    });
    
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr, code: code || 0 });
      } else {
        reject(new Error(`Command failed with code ${code}: ${stderr}`));
      }
    });
    
    child.on('error', (error) => {
      reject(error);
    });
  });
}