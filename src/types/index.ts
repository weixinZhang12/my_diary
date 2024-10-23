export interface DiaryContentInter {
    header: {
        weather: null | '晴天' | '雨天' | '多云',
        emotion: null | 'happy' | 'kry' | 'xxx',
        first_create_time: string
    },
    title:null|string
    content: string,

}