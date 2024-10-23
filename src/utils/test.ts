import { BaseDirectory, create, writeTextFile } from "@tauri-apps/plugin-fs"


export default {
  async run() {
    // await fs.getDiaryAllContent()
    await writeTextFile('my_diary/sdsdsd.json', 'data', { baseDir:BaseDirectory.AppData })
    // const contents = new Uint8Array(); // fill a byte array
    // const file = await create('my_diary/bar.txt', { baseDir: BaseDirectory.AppData });
    // await file.write(new TextEncoder().encode('Hello world'));
    // await file.close();
  }
}