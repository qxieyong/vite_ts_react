import React from "react";
// import { useNavigate } from "react-router-dom";
// import { useTranslation } from "react-i18next";
import style from "./index.module.scss";
import { connect } from "react-redux";
import {
  createIncrementAction,
  createDecrementAction,
  createIncrementAsyncAction,
} from "@/redux/users/action";

function Index() {
  // const navigate = useNavigate();
  // const { t } = useTranslation();

  return <div className={style.container}>首页</div>;
}

const mapStateToProps = (state) => ({
  userStore: state.usersReducer,
});

const mapDispatchToProps = {
  addCart: createIncrementAction,
  addNews: createDecrementAction,
  asyncAdd: createIncrementAsyncAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Index);
