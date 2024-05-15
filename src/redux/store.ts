/**
 * 该文件专门用于暴露一个 store 对象，整个应用只有一个 store 对象
 */

// 引入 legacy_createStore 重命名为 createStore 专门用于创建 redux 中最为核心的 store 对象
// createStore: 生成store对象， applyMiddleware: 使redux支持异步更行，需要配合 redux-thunk 使用
// combinReducers 將多个reducer需要借助api组合在一起
import {
  legacy_createStore as createStore,
  applyMiddleware,
  combineReducers,
} from "redux";

// 引入为 Count 组件服务的 reducer
import usersReducer from "./users/reducer";
// 引入 redux-thunk 用于支持异步 Action
import thunk from "redux-thunk";

//配置数据的持久化效果
import { persistReducer, persistStore } from "redux-persist";

//导入需要配置的数据源，可以选择，storage，cookie,session等
import storage from "redux-persist/lib/storage";

const allReducer = combineReducers({
  usersReducer,
});

const persitConfig = {
  key: "root",
  storage: storage,
  // 如果不想将部分state持久化，可以将其放入黑名单(blacklist)中.黑名单是设置
  // blacklist: ['ll']
};

//创建持久化的配置persist的信息
const persist_reducers = persistReducer(persitConfig, allReducer);

// 暴露Store

const store = createStore(persist_reducers, applyMiddleware(thunk));
const persistor = persistStore(store);
export { store, persistor };
