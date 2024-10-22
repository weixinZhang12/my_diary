import { useNavigate, useParams } from 'react-router-dom';
import Page from '../../components/Page';
import './index.scss'
import { Dialog, NavBar } from 'react-vant';
import { useEffect, useState } from 'react';
import Vditor from 'vditor';
import '../../theme/less/index.less'
import { BaseDirectory, exists, mkdir, writeTextFile } from '@tauri-apps/plugin-fs';
import date from '../../utils/date';

function Content() {
  return <div className="edit-content" >
    <div className="edit-content-content" id='vditor' ></div>
  </div>
}
const Edit: React.FC = () => {
  const nav = useNavigate()
  const { id } = useParams<{ id: string }>();
  const [vditor, setVditor] = useState<Vditor | null>(null)
  // const [vditor, setVditor] = useState<Vditor | null>(null)

  async function setContent() {
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
        after() {
          newvditor.setValue('sdsdsdsdsdsdsdds')
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
  async function mkNowDateTimeDir(date: string) {
    let nowDateTime = date
    let path='my_diary/diary/'+nowDateTime
    if (!await exists(path, { baseDir: BaseDirectory.AppData })) {
      mkdir(path, { baseDir: BaseDirectory.AppData })
    }
  }
  async function writeContent(date: string, data: string) {
    writeTextFile('my_diary/diary/'+date+'/' + date, data, { baseDir: BaseDirectory.AppData })
  }
  async function toHome() {
    Dialog.confirm({
      message: '是否保存',
      async onConfirm() {
        nav('/')
        let nowDateTime = date.getDateTime()
        await mkNowDateTimeDir(nowDateTime)

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
      <Content />
    </Page>
  );
};

export default Edit;
