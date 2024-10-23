import styles from './index.module.scss'
import { Button, Card, Cell, Empty, Flex, FloatingBall, NavBar, Popup, Typography } from 'react-vant';
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import data from '../../utils/date';
import { AddO, BrushO, PhotoO, SettingO } from '@react-vant/icons';
import Menu from '../../assets/images/Menu';
import './index.scss'
import { lang } from '../../lang/langManger';
import { useNavigate } from 'react-router-dom';
import preferenceUtils from '../../utils/prepferenceUtil';
import { BaseDirectory, readDir, readTextFile } from '@tauri-apps/plugin-fs';
import { DiaryContentInter } from '../../types';


interface LeftPropsInter {
  isShow: boolean,
  setShow: () => void

}
interface DiaryInter {
  title: string
  content: string
}

interface LeftDomInter {
  setShow: () => void
}
function LeftDom(props: LeftDomInter) {
  // const date=useRef(new Date())
  return (
    <div className={styles['left-nav-container']}>
      <Menu onClick={props.setShow} />
      <Button type='default' block>{data.getNowDate()}</Button>
    </div>
  )
}
// 左侧边栏
function LeftPopup(props: LeftPropsInter) {
  const nav = useNavigate()
  const [isShow, setIsShow] = useState(props.isShow)
  // const router=useIonRouter()
  // When first loaded,set show state to props,isShow
  // 当首次家在时自动执行，设置状态

  useEffect(() => {
    setIsShow(props.isShow)
    console.log('popup', isShow);

  }, [props.isShow])
  return (
    <Popup visible={isShow} onClose={() => props.setShow()} position='left'>
      <div className={styles['left-popur-ccontainer']}>
        <Cell.Group title={'13145314223'} card>
          <Cell title={lang.home_left_popup_img_text} icon={<PhotoO />} />

          <Cell title={lang.home_left_popup_theme_text} icon={<BrushO />} onClick={() => nav('/theme')} />
        </Cell.Group>
        <Cell.Group title={''} card className={styles['popup-bottom-cell-group']}>
          <Cell title={lang.home_left_popup_setting_text} onClick={() => nav('/setting')} icon={<SettingO />} />
        </Cell.Group>
      </div>
    </Popup>
  )
}
// 内容区域
function Content() {
  const nav = useNavigate()
  const [cardList] = useState<DiaryContentInter[]>(
    [
      {
        content: 'React Vant 是一套轻量、可靠的移动端 React 组件库，提供了丰富的基础组件和业务组件，帮助开发者快速搭建移动应用，使用过程中发现任何问题都可以提 Issue 给我们，当然，我们也非常欢迎你给我们发 PR。1',
        title: 'q',
        header: {
          weather: null,
          emotion: null,
          first_create_time: ''
        }
      },

    ]
  )
  async function getDiaryList() {
    // 读取diary目录内的文件目录,然后遍历这些目录,找到里面的日记json文件,读取内部内容
    let diaryAllDirList = await readDir('my_diary/diary', { baseDir: BaseDirectory.AppData })
    // console.log(diaryAllDirList);
    for (const dir of diaryAllDirList) {
      // dir为每天日记目录
      let diaryDir = await readDir('my_diary/diary/' + dir.name, { baseDir: BaseDirectory.AppData })
      console.log(diaryDir,'diaryDir');
      let diaryContent = await readTextFile('my_diary/diary/'+dir.name+'/'+dir.name+'.json',{baseDir:BaseDirectory.AppData})
      console.log(diaryContent,'diaryContent');
      

    }

  }
  useEffect(() => {
    getDiaryList()
  }, [])
  return <div className="home-content-container">
    {/* 悬浮窗 */}
    <FloatingBall offset={{ right: 30, bottom: 70 }} draggable={false} adsorb={false}>
      <Flex align='center' justify='center' className='home-content-container-floating-container'>
        <AddO />
      </Flex>
    </FloatingBall>
    {/* 笔记卡片列表 */}
    {/* 当笔记卡片数量为零时自动显示空状态 */}
    {cardList.length === 0 ?
      <Empty description={lang.home_content_enpty_text} />
      :
      <div className="home-content-container-card-container">

        {cardList.map((item) => {
          return <Card round key={item.title} onClick={() => nav('/edit/' + item.title)} className='home-content-container-card-container-card'>
            <Card.Body>
              <Typography.Text ellipsis={4}>{item.content}</Typography.Text>
            </Card.Body>
            <Card.Footer>xxx</Card.Footer>
          </Card>
        })}
      </div>}
  </div>
}
// 主页面
const Home: React.FC = () => {
  const [isShowPopup, setIsShowPopup] = useState(false)
  // BUG 
  function setShow() {
    setIsShowPopup(!isShowPopup)
  }
  async function aaa() {
    console.log(await preferenceUtils.getUserConfig());
    const userAgent = navigator.userAgent;
    console.log(userAgent);

  }
  useEffect(() => {
    aaa()
  }, [])
  aaa()
  return (
    // 页面
    <Page>
      {/* 导航栏 */}
      <NavBar leftText={<LeftDom setShow={setShow} />} />
      {/* 侧边栏 */}
      <LeftPopup isShow={isShowPopup} setShow={setShow} />
      {/* 内容区域 */}
      <Content />
    </Page>
  );
};

export default Home;
