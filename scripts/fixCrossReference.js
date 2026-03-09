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
    const lineStr = lines[i].trim();
    if (!lineStr) continue;
    const parsed = parseCSVLine(lineStr);
    if (parsed.length < 3) continue;

    let dept = parsed[0];
    if (dept) {
        currentDept = dept;
    } else {
        dept = currentDept; // carry over from previous row if empty cell
    }

    let name = parsed[1];
    let role = parsed[2];

    if (!name) continue;

    // Better normalization to match names flexibly
    let normName = name.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');

    if (!userMap[normName]) {
        userMap[normName] = { depts: new Set(), roles: new Set(), originalName: name };
    }

    if (dept) userMap[normName].depts.add(dept.trim());
    if (role && role.toLowerCase() !== 'miembro') userMap[normName].roles.add(role.trim());
}

// Ensure execution overrides for founders
const normExecs = ['freddy herrera cueva', 'vania pachas acuna', 'adriana alvarado leon'];
for (const ex of normExecs) {
    if (userMap[ex]) {
        userMap[ex].depts.add('Ejecutivo');
    }
}

// Function to normalize the JSON names for matching
const normalizeString = (str) => {
    return str.trim().toLowerCase()
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .replace(/\s+/g, ' ');
};

team.forEach(member => {
    let normName = normalizeString(member.name);

    // Try explicit match first
    let match = userMap[normName];

    // Try fuzzy match if no exact match
    if (!match) {
        let possibleMatches = Object.keys(userMap).filter(k => k.includes(normName) || normName.includes(k));
        if (possibleMatches.length > 0) {
            // Pick match with highest length to ensure safest bet
            let bestMatch = possibleMatches.reduce((a, b) => a.length > b.length ? a : b);
            match = userMap[bestMatch];
            console.log(`Fuzzy matched JSON name '${member.name}' to CSV name '${match.originalName}'`);
        }
    }

    if (match) {
        member.dept = Array.from(match.depts).filter(d => d);

        let roles = Array.from(match.roles).filter(r => r);
        if (normName.includes('freddy')) roles = ['CEO & Co-Fundador'];
        if (normName.includes('vania') || normName.includes('adriana')) roles = ['Co-Fundadora', ...roles.filter(r => !r.includes('Fundadora'))];

        if (roles.length > 0) {
            member.role = roles.join(' • ');
        } else {
            member.role = ''; // fallback if it was just "Miembro" which we filtered out
        }
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(team, null, 2));
console.log('Fixed department cross-referencing completed.');
