import { PhotoO, BrushO, SettingO } from "@react-vant/icons";
import { useNavigate } from "react-router-dom";
import { Popup, Cell } from "react-vant";
import { lang } from "../../lang/langManger";
import { Value } from "../../hooks/useValue";
interface LeftPropsInter {
    isShow: Value<boolean>,
  
  }
function LeftPopup(props: LeftPropsInter) {
    const nav = useNavigate()

    return (
      <Popup visible={props.isShow.value} onClose={() => props.isShow.value=false} position='left'>
        <div className={'home-left-popur-ccontainer'}>
          <Cell.Group title={'13145314223'} card>
            <Cell title={lang.home_left_popup_img_text} icon={<PhotoO />} />
  
            <Cell title={lang.home_left_popup_theme_text} icon={<BrushO />} onClick={() => nav('/theme')} />
          </Cell.Group>
          <Cell.Group title={''} card className={'home-popup-bottom-cell-group'}>
            <Cell title={lang.home_left_popup_setting_text} onClick={() => nav('/setting')} icon={<SettingO />} />
          </Cell.Group>
        </div>
      </Popup>
    )
  }

  export default LeftPopup