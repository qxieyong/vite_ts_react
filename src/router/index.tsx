import React from "react";
import { Navigate } from "react-router-dom";
import Index from "@/view/index";

const router = [
  {
    title: "index",
    path: "/",
    element: <Index />,
    children: [
      // 二级路由...
    ],
  },
  // 配置路由重定向 可配置404页面
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default router;
