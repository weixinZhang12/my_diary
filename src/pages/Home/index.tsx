import styles from './index.module.scss'
import { Card, Empty, Flex, FloatingBall, Lazyload, NavBar, Typography } from 'react-vant';
import Page from '../../components/Page';
import { useEffect, useState } from 'react';
import data from '../../utils/date';
import { AddO } from '@react-vant/icons';
import Menu from '../../assets/images/Menu';
import './index.scss'
import { lang } from '../../lang/langManger';
import { useNavigate } from 'react-router-dom';
import { BaseDirectory, readDir, readTextFile } from '@tauri-apps/plugin-fs';
import { DiaryContentInter } from '../../types';
import LeftPopup from './LeftPopup';
import MyCalendar from './MyCalendar';
import useSta from '../../hooks/useSta';



interface LeftDomInter {
  setShow: () => void
}

// 左侧边栏

// 内容区域

// 主页面
const Home: React.FC = () => {
  const [isShowPopup, setIsShowPopup] = useState(false)
  const nav = useNavigate()
  const isShowCalendar=useSta(false)
  const [cardList, setCardList] = useState<DiaryContentInter[]>(
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
    let diaryList: DiaryContentInter[] = []
    // 读取diary目录内的文件目录,然后遍历这些目录,找到里面的日记json文件,读取内部内容
    let diaryAllDirList = await readDir('my_diary/diary', { baseDir: BaseDirectory.AppData })
    for (const dir of diaryAllDirList) {
      // dir为每天日记目录
      // let diaryDir = await readDir('my_diary/diary/' + dir.name, { baseDir: BaseDirectory.AppData })
      let diaryContentString = await readTextFile('my_diary/diary/' + dir.name + '/diary' + '.json', { baseDir: BaseDirectory.AppData })
      let diaryContent: DiaryContentInter = JSON.parse(diaryContentString)
      diaryList.push(diaryContent)

    }
    setCardList([...diaryList])
  }
  useEffect(() => {
    getDiaryList()
  }, [])

  function setShow() {
    setIsShowPopup(!isShowPopup)
  }
  function LeftDom(props: LeftDomInter) {
    // const date=useRef(new Date())
    return (
      <div className={styles['left-nav-container']}>
        <Menu onClick={props.setShow} />
        <button className='home-left-nav-container-button' onClick={()=>isShowCalendar.value=!isShowCalendar.value}>{data.getNowDate()}</button>
      </div>
    )
  }
  return (
    // 页面
    <Page>
      {/* 导航栏 */}
      <NavBar leftText={<LeftDom setShow={setShow} />} />
      <MyCalendar isShow={isShowCalendar.value}/>
      {/* 侧边栏 */}
      <LeftPopup isShow={isShowPopup} setShow={setShow} />
      {/* 内容区域 */}
      <div className="home-content-container">
        {/* 悬浮窗 */}
        <FloatingBall offset={{ right: 30, bottom: 70 }} draggable={false} adsorb={false}>
          <Flex align='center' justify='center' className='home-content-container-floating-container'>
            <AddO />
          </Flex>
        </FloatingBall>
        {/* 笔记卡片列表 */}
        {/* 当笔记卡片数量为零时自动显示空状态 */}
        {cardList.length === 0
          ?
          <Empty description={lang.home_content_enpty_text} />
          :
          <div className="home-content-container-card-container">
            {cardList.map((item) => {
              return <Card round key={item.header.first_create_time} onClick={() => nav('/edit/' + item.header.first_create_time)} className='home-content-container-card-container-card'>
                <Card.Body>
                  <Typography.Text ellipsis={4}>{item.content}</Typography.Text>
                </Card.Body>
                <Card.Footer>{item.header.weather}</Card.Footer>
              </Card>
            })}
          </div>}
      </div>
    </Page>
  );
};

export default Home;
