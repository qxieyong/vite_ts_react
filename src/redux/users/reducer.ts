/**
 * 该文件是用于创建一个为 Count 组件服务的 reducer，本质就是一个函数
 * reducer 函数会接到两个参数，一个是之前状态 preState，一个是动作对象 action。
 */

// 引入常量
import { INCREMENT, DECREMENT } from "./constant";

const initState = {
  isLogin: false,
  data: null,
};

export default function countReducer(preState = initState, action) {
  // 从 action 对象中获取 type 和 data
  const { type, data } = action;
  // 根据 type 决定如何加工数据
  switch (type) {
    case INCREMENT:
      return { isLogin: !preState.isLogin, data };
    case DECREMENT:
      return { isLogin: false, data: null };
    default:
      return preState;
  }
}
