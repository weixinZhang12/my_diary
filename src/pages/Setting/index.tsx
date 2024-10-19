import Page from '../../components/Page';
import './index.scss'
import { Cell, NavBar } from 'react-vant';
import { lang } from '../../lang/langManger';
import { CommentCircleO, MedalO, UserO } from '@react-vant/icons';
import { useNavigate } from 'react-router-dom';
function Content() {
  const nav = useNavigate()
  function toLanguageView() {
    nav('/language')
  }
  return <div className="setting-content">
    <Cell.Group card className='setting-content-user-cell-group'>
      <Cell icon={<UserO />} title={lang.setting_userinfo}></Cell>
    </Cell.Group>
    <Cell.Group card className='setting-content-basis-cell-group'>
      <Cell icon={<MedalO />} title={lang.setting_style}></Cell>
    </Cell.Group>
    <Cell.Group card className='setting-content-other-cell-group'>
      <Cell icon={<CommentCircleO />} title={lang.setting_language} onClick={
        toLanguageView
      }></Cell>
    </Cell.Group>
  </div>
}
const Setting: React.FC = () => {
  const nav = useNavigate()

  function returnHome() {
    nav('/')
  }
  return (
    // 页面
    <Page>
      <NavBar title={'设置'} onClickLeft={returnHome} />
      <Content />
    </Page>
  );
};

export default Setting;
