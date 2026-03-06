import fs from 'fs';
import path from 'path';
import csv from 'papaparse';

const csvPath = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\Actualización del website de QuantumHub (Responses) - Form Responses 1.csv';
const imagesDir = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\public\\\\images\\\\equipo';
const outPath = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\public\\\\data\\\\equipo.json';

const csvData = fs.readFileSync(csvPath, 'utf8');
const results = csv.parse(csvData, { header: true, skipEmptyLines: true });

const images = fs.readdirSync(imagesDir);

function normalizeStr(str) {
    if (!str) return '';
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");
}

function toTitleCase(str) {
    if (!str) return '';
    return str.split(' ').map(word =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    ).join(' ');
}

const team = results.data.map(row => {
    // console.log(Object.keys(row));
    const nombre = row['Nombre (Solo uno)'] ? toTitleCase(row['Nombre (Solo uno)'].trim()) : '';
    const apellidos = row['Apellidos (Ambos)'] ? toTitleCase(row['Apellidos (Ambos)'].trim()) : '';
    const bioKeys = Object.keys(row).filter(k => k.startsWith('Descripción'));
    const bio = bioKeys.length > 0 ? row[bioKeys[0]].trim() : '';
    let linkedin = row['LinkedIn (adjuntar link)'] ? row['LinkedIn (adjuntar link)'].trim() : '';

    if (!linkedin.startsWith('http') && linkedin.length > 0) {
        linkedin = 'https://' + linkedin;
    }

    // Try to find image
    let matchImg = '';
    const normNombre = normalizeStr(nombre);
    const normApellidos = normalizeStr(apellidos);

    if (normNombre || normApellidos) {
        for (const img of images) {
            const normImg = normalizeStr(img);
            if ((normNombre && normImg.includes(normNombre)) ||
                (normApellidos && normApellidos.length > 3 && normImg.includes(normApellidos.substring(0, 5)))) {
                matchImg = img;
                break;
            }
        }

        if (!matchImg && normNombre) {
            for (const img of images) {
                const normImg = normalizeStr(img);
                if (normImg.includes(normNombre.substring(0, 4))) {
                    matchImg = img;
                    break;
                }
            }
        }
    }

    return {
        name: `${nombre} ${apellidos}`.trim(),
        role: "Miembro", // Mocked
        dept: "Quantum Interns", // Mocked
        bio: bio,
        linkedin: linkedin,
        foto: matchImg ? `/images/equipo/${matchImg}` : ''
    };
}).filter(m => m.name !== '');

if (!fs.existsSync(path.dirname(outPath))) {
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
}

fs.writeFileSync(outPath, JSON.stringify(team, null, 2));
console.log('Done writing equipo.json. Processed', team.length, 'members.');
