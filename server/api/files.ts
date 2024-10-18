export default defineEventHandler(async (event) => {
  const { files } = await readBody<{ files: File[] }>(event);
  const fileNames: string[] = [];
  for (const file of files) {
    fileNames.push(await storeFileLocally(file, 12, "/specificFolder"));
    const { binaryString, ext } = parseDataUrl(file.content);
  }
  return fileNames;
});

interface File {
  name: string;
  content: string;
  size: string;
  type: string;
  lastModified: string;
}
