import preferenceUtils from "../utils/prepferenceUtil";
import en from "./en";
import zh from "./zh";
export interface Lang {
    home_left_popup_img_text: string
    home_left_popup_theme_text: string
    home_left_popup_setting_text: string
    home_content_enpty_text: string
    setting_userinfo: string
    setting_style: string
    setting_import_and_exort: string
    setting_about: string
    setting_language: string
    setting_language_zh: string
    setting_language_en: string
}
// 此处内容需与langerManger内相同
export type LanguageList='zh'|'en'

const langManger = {
    zh: zh,
    en: en
}
// 动态加载语言
// async function getLang() {
//     const userConfig = await preferenceUtils.getUserConfig()
//     // console.log(userConfig,'langManger');

//     return langManger[userConfig.lang]
// }
export default langManger
const userConfig = await preferenceUtils.getUserConfig()
// 静态加载语言
export let lang=langManger[userConfig.lang]
// 动态加载语言,耗费内存更大在文字多的地方
// export let lang = await getLang()


