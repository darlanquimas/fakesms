import * as fs from "fs-extra";

const sourceDirectory = "src/views";
const destinationDirectory = "dist/views";

async function copyEjsFiles() {
  try {
    await fs.copy(sourceDirectory, destinationDirectory, { overwrite: true });
    console.log("Arquivos EJS copiados com sucesso!");
  } catch (err) {
    console.error("Erro ao copiar arquivos EJS:", err);
  }
}

copyEjsFiles();
