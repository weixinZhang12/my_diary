import preferenceUtils from "./prepferenceUtil"

export default {
    initConfig: async () => {
      const userConfigResult=await preferenceUtils.getUserConfig()
      console.log(userConfigResult);
    }
}