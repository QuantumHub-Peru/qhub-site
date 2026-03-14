import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import slugify from "slugify";
import readingTime from "reading-time";

// 1. CARPETA ORIGEN: Ahora apuntamos a la carpeta HITOS
const baseDir = "./public/data/HITOS";

function detectTags(text) {
    // Añadimos nuevas keywords específicas para Hitos/Eventos
    const keywords = {
        robotica: ["robot", "wro", "robotica"],
        investigacion: ["paper", "research", "qml", "machine learning"],
        premio: ["award", "premio", "ganó"],
        competencia: ["olimpiada", "competition", "hackathon"],
        internacional: ["internacional", "global", "latam"],
        desarrollo: ["software", "developer", "qiskit", "qubo"],
        evento: ["charla", "taller", "ponencia", "webinar", "conferencia"],
        alianza: ["colaboración", "apoyo", "alianza", "club", "ieee"],
        educacion: ["curso", "introductoria", "aprendizaje", "conceptos"]
    };

    const tags = [];
    for (const tag in keywords) {
        if (keywords[tag].some(k => text.toLowerCase().includes(k))) {
            tags.push(tag);
        }
    }
    return tags;
}

async function parseDocx(file) {
    const result = await mammoth.extractRawText({ path: file });

    const lines = result.value
        .split("\n")
        .map(l => l.trim())
        .filter(Boolean);

    const tIndex = lines.findIndex(l => l.includes("1. Título"));
    const dIndex = lines.findIndex(l => l.includes("2. Fecha"));
    const rIndex = lines.findIndex(l => l.includes("3. Resumen"));
    const devIndex = lines.findIndex(l => l.includes("4. Desarrollo"));
    // Usamos "5. Enlace" para que coincida tanto con "5. Enlace" como con "5. Enlace oficial"
    const linkIndex = lines.findIndex(l => l.includes("5. Enlace"));

    const title = lines.slice(tIndex + 1, dIndex).join(" ");
    const date = lines.slice(dIndex + 1, rIndex).join(" ");

    const rawDesc = lines.slice(rIndex + 1, devIndex);
    const desc = rawDesc.filter(l => !l.toLowerCase().includes("este texto aparecerá")).join(" ");

    const contentEnd = linkIndex !== -1 ? linkIndex : lines.length;
    const content = lines.slice(devIndex + 1, contentEnd);

    let links = [];
    if (linkIndex !== -1) {
        const rawLinks = lines.slice(linkIndex + 1);
        links = rawLinks.filter(l => l.startsWith("http"));
    }

    return {
        title,
        date,
        desc,
        content,
        fullText: content.join(" "),
        links
    };
}

async function generate() {
    // Verificamos si la carpeta existe, si no, evitamos que el script se rompa
    if (!fs.existsSync(baseDir)) {
        console.error(`❌ La carpeta ${baseDir} no existe. Por favor créala.`);
        return;
    }

    const folders = fs.readdirSync(baseDir);
    const items = [];

    for (const folder of folders) {
        const folderPath = path.join(baseDir, folder);

        // Saltamos si no es un directorio (por si hay archivos sueltos como .DS_Store)
        if (!fs.statSync(folderPath).isDirectory()) continue;

        const files = fs.readdirSync(folderPath);

        const docx = files.find(f => f.endsWith(".docx"));
        if (!docx) continue;

        const parsed = await parseDocx(path.join(folderPath, docx));

        const images = files.filter(f =>
            f.match(/\.(jpg|jpeg|png|webp)$/i)
        );

        const coverFile = images.find(i => i.toLowerCase().includes("portada"));
        const finalCoverFile = coverFile || images[0];

        // RUTA PARA LA WEB: Apuntando a HITOS
        const baseUrl = `/data/HITOS/${folder}`;

        const gallery = images
            .filter(i => i !== finalCoverFile)
            .map(i => encodeURI(`${baseUrl}/${i}`));

        const readStats = readingTime(parsed.fullText);
        const tags = detectTags(parsed.fullText);
        const id = slugify(parsed.title, { lower: true });

        items.push({
            id,
            title: parsed.title,
            cat: "Hitos", // CATEGORÍA CAMBIADA A HITOS
            date: parsed.date,
            desc: parsed.desc,
            content: parsed.content,
            readTime: readStats.text,
            featured: readStats.minutes > 4,
            image: finalCoverFile ? encodeURI(`${baseUrl}/${finalCoverFile}`) : "", // Previene error si no hay foto
            gallery,
            links: parsed.links,
            author: "QuantumHub Team",
            authorRole: "Dirección",
            authorAvatar: "https://ui-avatars.com/api/?name=QH&background=7c3aed&color=fff",
            tags
        });
    }

    // EXPORTAMOS COMO hitosItems
    const output = `export const hitosItems = ${JSON.stringify(items, null, 2)};`;

    // GUARDAMOS EN UN NUEVO ARCHIVO
    fs.writeFileSync(
        "./src/data/hitos.generated.ts",
        output
    );

    console.log("✅ Hitos generados:", items.length);
}

generate();