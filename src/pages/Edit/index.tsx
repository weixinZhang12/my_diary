import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import './index.scss'
import { Dialog, NavBar } from 'react-vant';
import { useEffect, useState } from 'react';
import Vditor from 'vditor';
import '../../theme/less/index.less'
import { BaseDirectory, exists, mkdir, readTextFile } from '@tauri-apps/plugin-fs';
// import date from '../../utils/date';
import fs from '../../utils/fs';
import { DiaryContentInter } from '../../types';


const Edit: React.FC = () => {
  const nav = useNavigate()
  const { id } = useParams<{ id: string }>();
  if (id === undefined) {
    Dialog.show({
      message: '发生错误id undefined'
    })
    return
  }
  const [vditor, setVditor] = useState<Vditor | null>(null)
  // const [vditor, setVditor] = useState<Vditor | null>(null)
  // 初始化日记以及设置日记内容
  async function setContent() {
    console.log(id, 'id......................');
    let DiaryContentString = await readTextFile('my_diary/diary/' + id + '/diary.json', { baseDir: BaseDirectory.AppData })
    let diaryContent: DiaryContentInter = JSON.parse(DiaryContentString)
    console.log(diaryContent);

    try {
      // 获取容器
      const content = document.querySelector('.edit-content-content')
      // 容器为null时直接返回
      if (content === null) {
        console.error('发生错误content不不存在',)
        return
      }
      // 将内容设置为html元素
      let contenth = content as HTMLDivElement
      // 创建newvdiror
      let newvditor = new Vditor('vditor', {
        toolbarConfig: {
          pin: true
        },
        counter: {
          enable: true
        },
        cache: {
          enable: false
        },
        height: contenth.offsetHeight,
        // 初始化之后调用
        async after() {

          newvditor.setValue(diaryContent.content)
          setVditor(newvditor)
        },
        toolbar: [
          'emoji',
          'link',
          'upload',
          'edit-mode',
          {
            name: 'more',
            toolbar: [
              'insert-after',
              'fullscreen',
              'preview',
            ],
          },
        ],
        theme: 'dark'
      })
      // 设置vditor的值
    } catch (error) {
      console.error(error, 'trach');
    }
  }
  useEffect(() => {
    setContent()
  }, [])
  // 创建带日期的日记文件夹
  async function mkDateTimeDir(date: string) {
    let nowDateTime = date
    let path = 'my_diary/diary/' + nowDateTime
    if (!await exists(path, { baseDir: BaseDirectory.AppData })) {
      mkdir(path, { baseDir: BaseDirectory.AppData })
    }
  }
  // BUG 使用官方的函数无法正常使用，因此是月使用的是自己封装的函数
  // 写入指定日期的日记文件内容
  async function writeDiaryContent(date: string, data: string) {
    let path = 'my_diary/diary/' + date + '/diary' + '.json'
    console.log(path);
    let contentObject: DiaryContentInter = {
      header: {
        weather: null,
        emotion: null,
        first_create_time: date
      },
      content: data,
      title: null
    }
    let contentObjectString = JSON.stringify(contentObject)
    await fs.writeTextToFile(path, contentObjectString)
  }
  async function toHome() {
    Dialog.confirm({
      message: '是否保存',
      // 确认之后返回到主页面，，同时创建文件夹，将内容填充到里面的文件
      async onConfirm() {
        try {
          // 先导航到主页面,然后创建用户文件夹,存放用户笔记文件
          nav('/')
          if (id === undefined) {
            console.log('id undefined');
            return
          }
          // let nowDateTime = date.getDateTime()
          // 创建当前时间笔记文件夹
          await mkDateTimeDir(id)
          if (vditor === null) {
            return
          }
          // 获取用户输入的内容
          let content = vditor.getValue()
          console.log(content, '182');
          // 写入内容到文件内
          await writeDiaryContent(id, content)

        } catch (error) {
          console.error(error)
        }
      },
      onCancel() {
        nav('/')
      }

    })
  }
  return (
    // 页面
    <Page>
      <NavBar title={'笔记'} onClickLeft={toHome} />
      <div className="edit-content" >
        <div className="edit-content-content" id='vditor' ></div>
      </div>
    </Page>
  );
};

export default Edit;
