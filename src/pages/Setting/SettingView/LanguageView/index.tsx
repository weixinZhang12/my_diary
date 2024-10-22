import { useEffect, useState } from 'react';
import './index.scss'
import { Button, Form, NavBar, Radio } from 'react-vant';
import Page from '../../../../components/Page';
import { lang, LanguageList } from '../../../../lang/langManger';
import preferenceUtils from '../../../../utils/prepferenceUtil';
import initUtils from '../../../../utils/initUtils';
import { useNavigate } from 'react-router-dom';
interface FormInter {
  selected_language: LanguageList
}

function Content() {
  const [form] = Form.useForm()
  const [selectedLanguage, _setSelectedLanguage] = useState<LanguageList>('zh')
  useEffect(() => {
    async function setLang() {
      const user_selected_language = (await preferenceUtils.getUserConfig()).lang
      form.setFieldsValue({ selected_language: user_selected_language })
    }
    setLang()
  }, [])

  async function onFinish(value: FormInter) {
    // // 读取用户配置
    const getResult = await preferenceUtils.getUserConfig()
    // // 将用户配置中的语言改为选中的语言
    getResult.lang = value.selected_language
    console.log(getResult);
    // // 保存到用户配置
    await preferenceUtils.setUserConfig(getResult)
    await initUtils.init()
    window.location.reload()

  }


  return <div className="setting-language-content">
    <Form
      initialValues={{
        selected_language: selectedLanguage
      }}
      form={form}
      onFinish={onFinish}
      footer={
        <div style={{ margin: '16px 16px 0' }}>
          <Button round nativeType='submit' type='primary' block>
            提交
          </Button>
        </div>
      }
    >
      <Form.Item name='selected_language' label='语言选项' >
        <Radio.Group >
          <Radio name='zh'>{lang.setting_language_zh}</Radio>
          <Radio name='en'>{lang.setting_language_en}</Radio>
        </Radio.Group>
      </Form.Item>
    </Form>

  </div>
}
const LanguageView: React.FC = () => {
  const nav = useNavigate()
  function toSetting() {
    nav('/setting')

  }
  return (
    // 页面
    <Page>
      <NavBar title={'语言'} onClickLeft={toSetting} />
      <Content />
    </Page>
  );
};

export default LanguageView;
