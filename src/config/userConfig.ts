 export interface UserConfig{
    lang:'zh'|'en'
    theme:'default'|string
}
const userConfig:UserConfig={
    lang: 'zh',
    // default为默认主题
    theme: 'default'
}
export default userConfig