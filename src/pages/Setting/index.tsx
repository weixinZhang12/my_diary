import Page from '../../components/Page';
import './index.scss'
import { Cell, NavBar } from 'react-vant';
import { lang } from '../../lang/langManger';
import { CommentCircleO, MedalO, UserO } from '@react-vant/icons';
import { useNavigate } from 'react-router-dom';

const Setting: React.FC = () => {
  const nav = useNavigate()
  function toLanguageView() {
    nav('/language')
  }
  function returnHome() {
    nav('/')
  }
  return (
    // 页面
    <Page>
      <NavBar title={lang.setting_navbar_title} onClickLeft={returnHome} />
      <div className="setting-content">
    <Cell.Group card className='setting-content-user-cell-group'>
      <Cell icon={<UserO />} title={lang.setting_userinfo} className='setting-content-user-cell-group-cell'></Cell>
    </Cell.Group>
    <Cell.Group card className='setting-content-basis-cell-group'>
      <Cell icon={<MedalO />} title={lang.setting_style} className='setting-content-basis-cell-group-cell'></Cell>
    </Cell.Group>
    <Cell.Group card className='setting-content-other-cell-group'>
      <Cell icon={<CommentCircleO />}  title={lang.setting_language} onClick={
        toLanguageView
      } className='setting-content-other-cell-group-cell'></Cell> 
    </Cell.Group>
  </div>    </Page>
  );
};

export default Setting;
