/**
 * 默认首页配置数据,获取组件方法传组件id
 */
import {
  componentDataList
} from "./componentList"

const getComponent = (id) => {
  for (let i=0;i<componentDataList.length;i++) {
    for(let j=0;j<componentDataList[i].content.length;j++){
      if (componentDataList[i].content[j].id == id) return componentDataList[i].content[j]
    }
  }
}

export default [
    getComponent(1),
    getComponent(2),
    getComponent(3),
    // getComponent(8),
    // getComponent(4),
    // getComponent(5),
    getComponent(7),
]

