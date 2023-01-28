import { type I18n, createI18n } from "vue-i18n";

const messages = {
  en: {
    menu: [
      "Home",
      "Individual",
      "Creation",
      "edit article",
      "article data",
      "Lang",
    ],
    localAr: "this site",
    submit: "submit",
    likes: "your likes",
    editInfo: "edit infomation",
    backtoperson: "Back to individual center",
    sureToChange: "Confirm the changes",
    uploadimg: "Support uploading images in jpg, png, jpeg format within 5M",
    userinfo: "personal information",
    accountinfo: "account settings",
    getcode: "get verification code",
    logout: "log out",
    login: "log in",
    loginmessage: "No account or password forgotten?",
    catalog: "Article directory",
    error404: "Sorry, the page you visited does not exist",
    backToHome: "Back to Home",
    reguser: "register or reset",
    regusermessage: "I have an account, log in",
    email: "email",
    profession: "profession",
    company: "company",
    newpassword: "password",
    verification: "verification",
    username: "user name",
    editAr: "edit article",
  },
  zh: {
    menu: ["首页", "个人中心", "创作中心", "写文章", "文章数据", "语言"],
    localAr: "本站文章",
    submit: "发表",
    likes: "你点赞的文章",
    editInfo: "编辑信息",
    backtoperson: "返回个人中心",
    sureToChange: "确认修改",
    uploadimg: "支持上传 jpg、png、jpeg 格式大小 5M 以内的图片",
    userinfo: "个人资料",
    accountinfo: "账户设置",
    getcode: "获取验证码",
    logout: "登出",
    login: "登录",
    loginmessage: "没有账号或者密码忘了？",
    catalog: "文章目录",
    error404: "抱歉，你访问的页面不存在",
    backToHome: "返回首页",
    reguser: "注册/更改密码",
    regusermessage: "我有账号，去登录",
    email: "邮箱",
    profession: "职位",
    company: "公司",
    newpassword: "新密码",
    verification: "验证码",
    username: "用户名",
    editAr: "编辑文章",
  },
};

// console.log(JSON.stringify(messages));

const i18n = createI18n({
  legacy: false,
  locale: "zh", // set locale
  messages, // set locale messages
  // If you need to specify other options, you can set other options
  // ...
});

export default i18n;
