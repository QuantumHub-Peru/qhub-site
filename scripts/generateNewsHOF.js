import fs from "fs";
import path from "path";
import mammoth from "mammoth";
import slugify from "slugify";
import readingTime from "reading-time";

// 1. AHORA LEEMOS DESDE PUBLIC: Aquí es donde pusiste las carpetas con los docx y fotos
const baseDir = "./public/data/HALL OF FAME";

function detectTags(text) {
  const keywords = {
    robotica: ["robot", "wro", "robotica"],
    investigacion: ["paper", "research", "qml", "machine learning"],
    premio: ["award", "premio", "ganó"],
    competencia: ["olimpiada", "competition", "hackathon"],
    internacional: ["internacional", "global", "latam"],
    desarrollo: ["software", "developer", "qiskit", "qubo"]
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
  const folders = fs.readdirSync(baseDir);
  const items = [];

  for (const folder of folders) {
    const folderPath = path.join(baseDir, folder);
    const files = fs.readdirSync(folderPath);

    const docx = files.find(f => f.endsWith(".docx"));
    if (!docx) continue;

    const parsed = await parseDocx(path.join(folderPath, docx));

    const images = files.filter(f =>
      f.match(/\.(jpg|jpeg|png|webp)$/i)
    );

    const coverFile = images.find(i => i.toLowerCase().includes("portada"));
    const finalCoverFile = coverFile || images[0];

    // 2. RUTA PARA LA WEB: Para el navegador, la carpeta "public" es la raíz ("/"), 
    // así que la ruta de las imágenes debe empezar directamente en "/data/..."
    const baseUrl = `/data/HALL OF FAME/${folder}`;

    const gallery = images
      .filter(i => i !== finalCoverFile)
      .map(i => encodeURI(`${baseUrl}/${i}`));

    const readStats = readingTime(parsed.fullText);
    const tags = detectTags(parsed.fullText);
    const id = slugify(parsed.title, { lower: true });

    items.push({
      id,
      title: parsed.title,
      cat: "Hall of Fame",
      date: parsed.date,
      desc: parsed.desc,
      content: parsed.content,
      readTime: readStats.text,
      featured: readStats.minutes > 4,
      image: encodeURI(`${baseUrl}/${finalCoverFile}`),
      gallery,
      links: parsed.links,
      author: "QuantumHub Team",
      authorRole: "Dirección",
      authorAvatar: "https://ui-avatars.com/api/?name=QH&background=7c3aed&color=fff",
      tags
    });
  }

  const output = `export const hallOfFameItems = ${JSON.stringify(items, null, 2)};`;

  // 3. GUARDAR EL CÓDIGO EN SRC: El archivo TypeScript generado debe guardarse 
  // dentro de src/data para que React no tire errores al intentar importarlo.
  // IMPORTANTE: Asegúrate de que la carpeta src/data exista.
  fs.writeFileSync(
    "./src/data/hallOfFame.generated.ts",
    output
  );

  console.log("✅ Hall of Fame generado:", items.length);
}

generate();