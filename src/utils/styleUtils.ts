export default {
    setProperty: (props: string, data: string) => {
        document.getElementsByTagName('body')[0].style.setProperty(props, data)
        document.documentElement.style.setProperty(props, data)
    },
    getIsDark: () => {
        const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches; // 是深色       console.log(isDark);
        return isDark
    },
     applyGlobalStyles  (css: string)  {
        // 创建或更新全局 <style> 标签
        let styleElement = document.getElementById('dynamic-styles') as HTMLStyleElement | null;
        if (!styleElement) {
          styleElement = document.createElement('style');
          styleElement.id = 'dynamic-styles';
          document.head.appendChild(styleElement);
        }
        styleElement.innerHTML = css;
      },
      deleteGlobalStyle(){
        let styleElement=document.getElementById('dynamic-styles')
        styleElement?.remove()
      }
}