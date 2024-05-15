const analysisInitData = (initData) => {
  const params = new URLSearchParams(initData);
  // 遍历参数并输出键值对
  for (const [key, value] of params) {
    console.log(`${key}: ${value}`);
  }

  // 获取特定参数的值
  const userJsonString = params.get("user");
  console.log(userJsonString);
  const user = JSON.parse(decodeURIComponent(userJsonString as string));

  // 将用户数据解析为JavaScript对象
  if (import.meta.env.VITE_MODE !== "development") {
    localStorage.setItem("InitDataUser", JSON.stringify(user));
  }
  return user;
};

export default analysisInitData;
