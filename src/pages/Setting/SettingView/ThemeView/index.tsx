import { useEffect, useState } from 'react';
import './index.scss'
import { Button, Cell, NavBar, Radio, SwipeCell } from 'react-vant';
import Page from '../../../../components/Page';
import { useNavigate } from 'react-router-dom';
import { open } from '@tauri-apps/plugin-dialog';
import { BaseDirectory, readDir, readTextFile } from '@tauri-apps/plugin-fs';
import preferenceUtils from '../../../../utils/prepferenceUtil';
import { BrushO } from '@react-vant/icons';
import fs from '../../../../utils/fs';
// interface FormInter {
//   selected_language: LanguageList
// }
// interface CellLeftDomInter {
//   name: string
//   isSelected: boolean
// }
interface ThemeListInter {
  title: string
  name: string
  // isSelected: boolean
}
function CellLeftDom() {

  const [selectedName, setSelectedName] = useState('default')
  const [themeList, setThemeList] = useState<ThemeListInter[]>([])
  async function pushUserTheme() {
    try {
      // 获取查询到的结果
      const entries = await readDir('my_diary/theme', { baseDir: BaseDirectory.AppData })
      console.log(entries);
      let themeList: ThemeListInter[] = []
      for (const item of entries) {
        console.log(item, '344343434343');
        themeList.push({ name: item.name, title: item.name })
      }
      // 渲染到列表
      setThemeList([...themeList])
      const userConfig = await preferenceUtils.getUserConfig()
      setSelectedName(userConfig.theme)
      return entries
    } catch (error) {
      console.log(error);
    }
  }
  async function setSelectedTheme(themeName: string) {
    setSelectedName(themeName)
    const userConfig = await preferenceUtils.getUserConfig()
    userConfig.theme = themeName
    await preferenceUtils.setUserConfig(userConfig)
    window.location.reload()
  }
  useEffect(() => {
    pushUserTheme()
  }, [])
  return <Radio.Group value={selectedName}>
    <Cell.Group card>
      <Cell
        clickable
        title='默认'
        icon={<BrushO />}
        onClick={() => setSelectedTheme('default')}
        rightIcon={<Radio name='default' />}
      />
      {
        themeList.map((item) => {
          return <SwipeCell key={item.name} stopPropagation={false} rightAction={<Button square type='danger'>删除</Button>}>
            <Cell
              clickable
              title={item.title}
              icon={<BrushO />}
              onClick={() => setSelectedTheme(item.name)}
              rightIcon={<Radio name={item.name} />}
            />
          </SwipeCell>
        })
      }

    </Cell.Group>
  </Radio.Group>
}
function RightDom() {
  const [_cssContent, setCssContent] = useState<string | null>(null);

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
      await fs.writeTextToFile('my_diary/theme/' + fileName, content)
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


  return <div className="theme-content">
    <CellLeftDom />
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
      <NavBar title={'主题'} onClickLeft={toSetting} rightText={<RightDom />} />
      <Content />
    </Page>
  );
};

export default ThemeView;
