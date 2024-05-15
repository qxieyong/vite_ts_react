import { message } from "antd";
// import i18next from "@/utils/language/index";
const copy = (val: string, text?: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(val).then(res => {
      console.log(res)
      message.open({
        type: "error",
        content: text || "拷贝成功!",
        duration: 1.5,
      });
    }).catch(e => {
      console.log(e);
      message.open({
        type: "error",
        content: "拷贝失败!",
        duration: 1.5,
      });
    })
  } else {
    const input: HTMLInputElement = document.createElement("input");
    input.value = val;
    document.body.appendChild(input);
    input.select();
    document.execCommand("Copy");
    document.body.removeChild(input);
    message.open({
      type: "success",
      content: text || "拷贝成功!", //i18next.t("global.Copy")!
      duration: 1.5,
    });
  }
};

export default copy;

