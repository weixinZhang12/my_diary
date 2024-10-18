import { useState } from 'react';
import './index.scss'
import { Button, Cell, NavBar, Radio } from 'react-vant';
import Page from '../../../../components/Page';
import { LanguageList } from '../../../../lang/langManger';
import { useNavigate } from 'react-router-dom';
interface FormInter {
  selected_language: LanguageList
}
interface CellLeftDomInter {
  name: string
  isSelected: boolean
}
interface ThemeListInter {
  name: string
  isSelected: boolean
}
function CellLeftDom(props: CellLeftDomInter) {
  return <Radio.Group value={props.isSelected ? 'radio' : ''}>
    <Radio name={'radio'} >{props.name}</Radio>
  </Radio.Group>
}
function RightDom() {
  const [cssContent, setCssContent] = useState<string | null>(null);

  const handleFolderSelect = async () => {
    try {
      // 打开文件夹选择对话框
      const dirHandle = await (window as any).showDirectoryPicker();
      // 遍历文件夹，寻找 index.css 文件
      for await (const [name, handle] of dirHandle) {
        // 如果类型为文件并且文件为index.css
        if (handle.kind === 'file' && name === 'index.css') {
          // 获取该文件
          const file = await handle.getFile();
          // 内容为文件内容
          const content = await file.text();
          setCssContent(content);  // 保存 CSS 内容
          applyGlobalStyles(content);  // 应用全局样式
          // break;  // 找到 index.css 后停止遍历
        }
        if (handle.kind === 'file' && name === 'index.js') {
          // 获取该文件
          const file = await handle.getFile();
          // 内容为文件内容
          const content = await file.text();
          new Function(content)()
          break;  // 找到 index.css 后停止遍历
        }
      }
    } catch (error) {
      console.error('文件夹选择失败', error);
    }
  };
  const applyGlobalStyles = (css: string) => {
    // 创建或更新全局 <style> 标签
    let styleElement = document.getElementById('dynamic-styles') as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement('style');
      styleElement.id = 'dynamic-styles';
      document.head.appendChild(styleElement);
    }
    styleElement.innerHTML = css;
  };

  return <div className="theme-navbar-rightText">
    {/* <AddO/> */}
    <button className='theme-navbar-rightText-button' onClick={handleFolderSelect} >添加</button>
  </div>
}

// 内容区域
function Content() {
  // 渲染列表
  const [themeList, setThemeList] = useState<ThemeListInter[]>([{
    name: 'xxxx',
    isSelected: true
  }])

  return <div className="theme-content">
    {themeList.map((item) => {
      // 用户导入的文件列表
      return <Cell.Group card className='theme-content-cell-group' key={item.name} >
        <Cell title={<CellLeftDom name={item.name} isSelected={item.isSelected} key={item.name} />} className='theme-content-cell-group-cell' />
      </Cell.Group>
    })}

  </div>
}
const ThemeView: React.FC = () => {
  const nav = useNavigate()
  function toSetting() {
    nav('/')

  }
  return (
    // 页面
    <Page>
      <NavBar title={'语言'} onClickLeft={toSetting} rightText={<RightDom />} />
      <Content />
    </Page>
  );
};

export default ThemeView;
