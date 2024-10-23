import { BaseDirectory, create, readDir } from "@tauri-apps/plugin-fs"

export default {
    // 读取到的日记文件夹内容
    async getDiaryDir() {
        let dirContent = await readDir('my_diary/diary', { baseDir: BaseDirectory.AppData })
        return dirContent
    },
    async getDiaryAllContent() {
        try {
            let allDiary = await this.getDiaryDir()
            for (const item of allDiary) {
                console.log(item.name);
                let diaryFiles = await readDir('my_diary/diary/' + item.name, { baseDir: BaseDirectory.AppData })
                console.log(diaryFiles);

            }
        } catch (error) {
            console.error(error)
        }

    },
    async writeTextToFile(path: string, data: string) {
        const file =await create(path, { baseDir: BaseDirectory.AppData })
        await file.write(new TextEncoder().encode(data))
        file.close()
    }
}