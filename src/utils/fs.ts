import { BaseDirectory, create, readDir } from "@tauri-apps/plugin-fs"

export default {
    // 读取日记文件夹内容
    async getDiaryDir() {
        let dirContent = await readDir('my_diary/diary', { baseDir: BaseDirectory.AppData })
        return dirContent
    },
    /**
     * 获取用户日记文件夹每个日期文件夹内的文件名
     * --diary
     * ----2024-07-07 12:33
     * ------diary.json
     * 那么返回diary.json及其他文件信息
     */
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
    // 将指定内容写至指定文件
    async writeTextToFile(path: string, data: string) {
        const file =await create(path, { baseDir: BaseDirectory.AppData })
        await file.write(new TextEncoder().encode(data))
        file.close()
    }
}