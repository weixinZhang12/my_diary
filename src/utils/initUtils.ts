import { BaseDirectory, exists, mkdir, readTextFile } from "@tauri-apps/plugin-fs";
import preferenceUtils from "./prepferenceUtil"
import styleUtils from "./styleUtils";
import { appDataDir } from "@tauri-apps/api/path";
const init = {
  async init() {
    const userConfigResult = await preferenceUtils.getUserConfig()
    console.log(userConfigResult);
    await this.initAppDir()
    await this.initStyle()
  let a=await appDataDir()
  console.log(a);
  

  },
  async initAppDir() {
    if (!await exists('my_diary', { baseDir: BaseDirectory.AppData })) {
      await mkdir('my_diary', { baseDir: BaseDirectory.AppData })
    }
    if (!await exists('my_diary/theme', { baseDir: BaseDirectory.AppData })) {
      await mkdir('my_diary/theme', { baseDir: BaseDirectory.AppData })
    }
    if (!await exists('my_diary/diary', { baseDir: BaseDirectory.AppData })) {
      await mkdir('my_diary/diary', { baseDir: BaseDirectory.AppData })
    }
  },
  async initStyle() {
    const userConfig = await preferenceUtils.getUserConfig()
    console.log(userConfig, 'style');
    try {
      // 当主题不是默认主题时
    if (userConfig.theme !== 'default') {
      // 读取theme内用户文件内部配置的主题名的文件
      const content = await readTextFile('my_diary/theme/' + userConfig.theme, { baseDir: BaseDirectory.AppData })
      console.log(content)
      
     await styleUtils.applyGlobalStyles(content)

    }
    } catch (error) {
      console.error(error);
      
    }
    

  }

}
export default init

