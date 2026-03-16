import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonPath = path.join(__dirname, '..', 'public', 'data', 'equipo.json');
let data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// Extract Valentino and Gabriel
const valentinoIdx = data.findIndex(person => person.name.includes('Valentino'));
const gabrielIdx = data.findIndex(person => person.name.includes('Gabriel Manayay'));

if (valentinoIdx !== -1 && gabrielIdx !== -1) {
  const valentino = data.splice(valentinoIdx, 1)[0];
  // Re-find Gabriel because splicing changed the index
  const newGabrielIdx = data.findIndex(person => person.name.includes('Gabriel Manayay'));
  const gabriel = data.splice(newGabrielIdx, 1)[0];
  
  data.push(valentino);
  data.push(gabriel);
  
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
  console.log("Successfully reordered.");
} else {
  console.log("Could not find one or both members.", valentinoIdx, gabrielIdx);
}
