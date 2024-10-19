import { useState } from 'react';
import './index.scss'
import { Cell, NavBar, Radio } from 'react-vant';
import Page from '../../../../components/Page';
import { LanguageList } from '../../../../lang/langManger';
import { useNavigate } from 'react-router-dom';
import { open } from '@tauri-apps/plugin-dialog';
import { BaseDirectory, readTextFile, writeTextFile } from '@tauri-apps/plugin-fs';
import preferenceUtils from '../../../../utils/prepferenceUtil';
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
      // 打开文件选择对话框
      const filepath = await open({
        multiple: false,
        directory: false
      })
      // 用户不做出选择结束选取，默认无操作
      if (filepath === null) {
        return
      }
      console.log(filepath);
      const content = await readTextFile(filepath)
      // 匹配最后一个文件名
      const fileName = filepath.match(/[^/]+$/)?.[0];
      if (fileName === undefined) {
        return
      }
      // 保存到用户的theme文件夹内部
      await writeTextFile('my_diary/theme/' + fileName, content, { baseDir: BaseDirectory.Document })
      let userConfig = await preferenceUtils.getUserConfig()
      userConfig.theme = fileName
      console.log(content);
      // 将用户选择的文件名保存到用户配置中
      await preferenceUtils.setUserConfig(userConfig)
     
      setCssContent(content);  // 保存 CSS 内容
      applyGlobalStyles(content);  // 应用全局样式



    } catch (error) {
      console.error('发生错误', error);
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
    name: '默认主题',
    isSelected: true
  }])

  return <div className="theme-content">
    {themeList.map((item) => {
      // 用户导入的文件列表
      return <Cell.Group card className='theme-content-cell-group' key={item.name} >
        <Cell title={''} className='theme-content-cell-group-cell' >
          <CellLeftDom name='xxx' isSelected={false}/>
        </Cell>
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
