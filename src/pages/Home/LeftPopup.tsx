import { PhotoO, BrushO, SettingO } from "@react-vant/icons";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Popup, Cell } from "react-vant";
import { lang } from "../../lang/langManger";
interface LeftPropsInter {
    isShow: boolean,
    setShow: () => void
  
  }
function LeftPopup(props: LeftPropsInter) {
    const nav = useNavigate()
    
    return (
      <Popup visible={props.isShow} onClose={() => props.setShow()} position='left'>
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