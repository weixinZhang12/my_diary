import { BaseDirectory, exists, mkdir, readTextFile } from "@tauri-apps/plugin-fs";
import preferenceUtils from "./prepferenceUtil"
import styleUtils from "./styleUtils";
// import { appDataDir } from "@tauri-apps/api/path";
import test from "./test";
const init = {
  async init() {
    const userConfigResult = await preferenceUtils.getUserConfig()
    console.log(userConfigResult);
    await this.initAppDir()
    await this.initStyle()
    // let a = await appDataDir()
    // console.log(a);
    test.run()


  },
  /**
   * 初始化项目的文件夹，若不存在那么创建
   * my_diary为主文件夹
   * theme为主题文件夹
   * diary为用户日记文件夹
   */
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
  /**
   * 初始化样式
   * 获取用户的配置内容，如果主题不主题的值不为default，
   * 那么就去theme文件夹找到与配置文件夹值中主题一样的文件名
   * 获取他的内容，应用该样式
   */
  async initStyle() {
    const userConfig = await preferenceUtils.getUserConfig()
    // console.log(userConfig, 'style');
    try {
      // 当主题不是默认主题时
      if (userConfig.theme !== 'default') {
        // 读取theme内用户文件内部配置的主题名的文件内容
        const content = await readTextFile('my_diary/theme/' + userConfig.theme, { baseDir: BaseDirectory.AppData })
        // console.log(content)
        // 应用这个样式
        await styleUtils.applyGlobalStyles(content)

      }
    } catch (error) {
      console.error(error);

    }


  }

}
export default init

