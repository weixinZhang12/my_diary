export default {
    setProperty: (props: string, data: string) => {
        document.getElementsByTagName('body')[0].style.setProperty(props, data)
        document.documentElement.style.setProperty(props, data)
    },
    getIsDark: () => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // 是深色       console.log(isDark);
        return isDark
    }
}