/**
 * 该组件专门为 Count 组件生成 action 对象
 */

// 引入常量
import { DECREMENT, INCREMENT } from './constant'
// import store from './store'

// 加操作  同步 Action 返回的是一般类型的 Object
export const createIncrementAction = data => ({ type: INCREMENT, data })
// 减操作
export const createDecrementAction = data => ({ type: DECREMENT, data })
// 异步加
export const createIncrementAsyncAction = (data, time) => {
  // 异步 Action 返回的是函数，因为函数里面可以开启异步任务, 异步 Action 中一般都会调用同步 Action。
  return (dispatch) => {  // 回调会有 dispatch ，这样就不用再引用 store 了。
    setTimeout(() => {
      dispatch(createIncrementAction(data));
      // store.dispatch(createIncrementAction(data));
    }, time)
  }
}