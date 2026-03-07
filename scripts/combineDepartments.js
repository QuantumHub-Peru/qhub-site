import fs from 'fs';

const csvPath = 'Actualización del website de QuantumHub (Responses) - Organización.csv';
const jsonPath = 'public/data/equipo.json';

const team = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
const csv = fs.readFileSync(csvPath, 'utf8');

const lines = csv.split('\n');
const parseCSVLine = (line) => {
    let result = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            inQuotes = !inQuotes;
        } else if (c === ',' && !inQuotes) {
            result.push(cur.trim());
            cur = '';
        } else {
            cur += c;
        }
    }
    result.push(cur.trim());
    return result;
};

let currentDept = '';
const userMap = {};

for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    const parsed = parseCSVLine(lines[i]);
    if (parsed.length < 3) continue;

    let dept = parsed[0];
    if (dept) currentDept = dept;
    else dept = currentDept;

    let name = parsed[1];
    let role = parsed[2];

    if (!name) continue;
    let normName = name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    if (!userMap[normName]) {
        userMap[normName] = { depts: new Set(), roles: new Set() };
    }
    if (dept) userMap[normName].depts.add(dept.trim());
    if (role) userMap[normName].roles.add(role.trim());
}

// Ensure execution overrides for founders
const normExecs = ['freddy herrera cueva', 'vania pachas acuna', 'adriana alvarado leon'];
for (const ex of normExecs) {
    if (userMap[ex]) {
        userMap[ex].depts.add('Ejecutivo');
    }
}

team.forEach(member => {
    let normName = member.name.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (userMap[normName]) {
        member.dept = Array.from(userMap[normName].depts).filter(d => d);

        let roles = Array.from(userMap[normName].roles).filter(r => r && r.toLowerCase() !== 'miembro');
        if (normName === 'freddy herrera cueva') roles = ['CEO & Co-Fundador'];
        if (normName === 'vania pachas acuna' || normName === 'adriana alvarado leon') roles = ['Co-Fundadora', ...roles.filter(r => !r.includes('Fundadora'))];

        member.role = roles.join(' • ');
    } else {
        if (!Array.isArray(member.dept)) {
            member.dept = member.dept ? [member.dept] : [];
        }
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(team, null, 2));
console.log('Successfully merged multiple departments into arrays.');
