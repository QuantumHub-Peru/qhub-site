import fs from 'fs';
import path from 'path';
import csv from 'papaparse';

const csvPath = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\Actualización del website de QuantumHub (Responses) - Organización.csv';
const jsonPath = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\public\\\\data\\\\equipo.json';

const csvData = fs.readFileSync(csvPath, 'utf8');
const results = csv.parse(csvData, { header: true, skipEmptyLines: true });

const teamJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function normalize(str) {
    if (!str) return '';
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().replace(/\s+/g, " ");
}

function toTitleCase(str) {
    if (!str) return '';
    return str.trim().split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

let currentDept = 'Quantum Interns';
for (const row of results.data) {
    if (row['Departamento'] && row['Departamento'].trim() !== '') {
        currentDept = toTitleCase(row['Departamento'].trim());
    }

    const nombreFull = row['Nombre'] ? row['Nombre'].trim() : '';
    if (!nombreFull) continue;

    const cargo = row['Cargo'] ? row['Cargo'].trim() : '';
    const normNombre = normalize(nombreFull);

    // Find in json
    const jsonMatchIndex = teamJson.findIndex(t => normalize(t.name) === normNombre);
    if (jsonMatchIndex !== -1) {
        teamJson[jsonMatchIndex].dept = currentDept;
        teamJson[jsonMatchIndex].role = cargo;
    }
}

fs.writeFileSync(jsonPath, JSON.stringify(teamJson, null, 2));
console.log('Update complete.');
