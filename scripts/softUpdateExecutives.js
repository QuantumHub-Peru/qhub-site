import fs from 'fs';

const jsonPath = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\public\\\\data\\\\equipo.json';
const team = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

// 1. Freddy
let freddy = team.find(p => p.name.includes('Freddy Herrera'));
if (freddy) {
    freddy.dept = 'Ejecutivo';
    freddy.role = 'CEO & Co-Fundador';
}

// 2. Vania
let vania = team.find(p => p.name.includes('Vania Pachas'));
if (vania) {
    vania.dept = 'Ejecutivo';
    vania.role = 'Co-Fundadora';
}

// 3. Adriana
let adriana = team.find(p => p.name.includes('Adriana Alvarado León'));
if (adriana) {
    adriana.dept = 'Ejecutivo';
    adriana.role = 'Co-Fundadora';
} else {
    team.push({
        name: 'Adriana Alvarado León',
        role: 'Co-Fundadora',
        dept: 'Ejecutivo',
        bio: 'Fundadora de QuantumHub Perú, directora del Departamento Académico y miembro de Investigación...',
        linkedin: 'https://www.linkedin.com/in/adriana-alvarado-leon/',
        foto: ''
    });
}

// Remove any duplicates (if someone appears twice, maybe with different roles, we keep the Ejecutivo one or first one)
const uniqueTeam = [];
const seenNames = new Set();
// Sort so that Ejecutivo is processed first and kept
team.sort((a, b) => a.dept === 'Ejecutivo' ? -1 : (b.dept === 'Ejecutivo' ? 1 : 0));

for (let member of team) {
    if (!seenNames.has(member.name)) {
        seenNames.add(member.name);
        uniqueTeam.push(member);
    }
}

fs.writeFileSync(jsonPath, JSON.stringify(uniqueTeam, null, 2));
console.log('Executives updated and duplicates removed.');
