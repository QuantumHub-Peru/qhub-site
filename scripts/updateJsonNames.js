import fs from 'fs';

const jsonPath = 'c:\\\\Users\\\\E\\\\Desktop\\\\quantum-nexus\\\\public\\\\data\\\\equipo.json';
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

function toTitleCase(str) {
    if (!str) return '';
    return str.split(' ').map(word => {
        if (!word) return '';
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }).join(' ');
}

data.forEach(member => {
    if (member.name) {
        member.name = toTitleCase(member.name);
    }
});

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
console.log('JSON updated with Title Case names.');
