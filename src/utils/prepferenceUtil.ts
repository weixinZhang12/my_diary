import userConfig, { UserConfig } from '../config/userConfig';
import { readTextFile, BaseDirectory, writeTextFile, mkdir, exists } from '@tauri-apps/plugin-fs';
import { Dialog } from 'react-vant';

const preferenceUtils = {
    // 读取用户配置
    async getUserConfig() {
        try {
            // 读取用户文件配置
            const configContentString = await readTextFile('my_diary/config.json', { baseDir: BaseDirectory.Document })
            let configContent = JSON.parse(configContentString) as UserConfig
            return configContent
        } catch (error) {
            console.error(error);
            // 创建用户配置
            await this.setUserConfig(userConfig)
            // 读取用户配置
            const configContentString = await readTextFile('my_diary/config.json', { baseDir: BaseDirectory.Document })
            let configContent = JSON.parse(configContentString) as UserConfig
            return configContent
        }
    },
    async setUserConfig(data: UserConfig) {
        try {
            // 充满名目录
            await this.mkRootDir()
            // 写文件的到该目录
            await writeTextFile('my_diary/config.json', JSON.stringify(data), { baseDir: BaseDirectory.Document });
        } catch (error) {
            console.error(error);
            Dialog.show({
                message: '请确认是否给予了应用读写权限' + error
            })
        }

    },
    async mkRootDir() {
        // 如果不存在目录，那么创建目录
        if (!await exists('my_diary', { baseDir: BaseDirectory.Document })) {
            try {
                // 创建目录
                await mkdir('my_diary', { baseDir: BaseDirectory.Document })
            } catch (error) {
                console.error(error)
                Dialog.show({
                    message: '创建目录失败' + error
                })
            }
        }
    }
}
export default preferenceUtils