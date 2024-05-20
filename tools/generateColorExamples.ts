import fs from 'fs';
import path from 'path';
import { ColorPalette } from '../src/types';

const makeColorTable = (palette: ColorPalette[]) => {
  return palette.map((p) => {
    // name
    const colorName = p.name;
    // colors
    const colorBoxes = p.colors.map((color) => {
      return `<div style="background-color: ${color}; width: 40px; height: 40px;"></div>`;
    }).join('');
    return `<div style="margin: 16px 0 32px 0;"><div style="font-wigth: 400;">${colorName}</div><div style="display: flex; flex-wrap: wrap; max-width: 480px;">${colorBoxes}</div></div>`;
  }).join('');
}

const palettesDir = path.resolve(__dirname, '../src/palettes');
const paletteFiles = fs.readdirSync(palettesDir).filter(file => file.endsWith('.ts'));

let html = '';

paletteFiles.forEach((file) => {
  const palette = require(path.resolve(palettesDir, file));
  const paletteName = Object.keys(palette)[0];
  html += `<h3>${paletteName}</h3>\n`;
  html += makeColorTable(palette[paletteName]);
  html += "\n\n";
});

const readmePath = path.resolve(__dirname, '../colorExamples.html');
const readme = fs.readFileSync(readmePath, 'utf8');
const replaced = readme.replace(/<!-- Color Examples -->(.|\n)*<!-- \/Color Examples -->/, `<!-- Color Examples -->\n${html}\n<!-- /Color Examples -->`);

fs.writeFileSync(readmePath, replaced);


