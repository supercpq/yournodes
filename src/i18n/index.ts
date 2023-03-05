import { createI18n } from "vue-i18n";

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
    changeava: "click to change",
    qrinfo: "phone-reading",
    illustrate: [
      "Controls randomness: Lowering results in less random completions. As the temperatrue approaches zero,the model will become deterministic and repetitve.",
      "The maximum number of tokens to generate.Requests can use up to 2,048 or 4,000 tokens shared between prompt and completion. The exact limit varies by model.(One token is roughly 4 characters for nolmal English text)",
      "Control diversity via nucleus sampling:  means half of all likelihood-werghted options are considered.",
      "How much to penalize new tokens based on their existing frequency in the text so far.Decreases the model's likelihood to repeat the same line verbatim.",
      "How much to penalize new tokens based on whether they appear in the text so far.Increases the model's likelihood to talk about new topics.",
    ],
    setting: "Setting",
    logOutPrompt: "Really? Are you sure to logout?",
    backTop: "back to top",
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
    changeava: "点击更换头像",
    qrinfo: "手机阅读",
    illustrate: [
      "控制随机性：降低随机完成的结果。 接近零，则模型将变得确定和重复。",
      "要生成的令牌的最大数量。请求最多可以使用提示和完成之间共享的 2,048 或 4,000 个token。确切的限制因模型而异。（一个token大约是 4 个字符，用于正常的英文文本）",
      "通过核采样控制多样性：意味着考虑了所有似然加权选项的一半。",
      "到目前为止，根据新标记在文本中的现有频率对新标记进行多少损失。降低模型逐字重复同一行的可能性。",
      "根据到目前为止它们是否出现在文本中，对新标记进行多少损失。增加模型谈论新主题的可能性。",
    ],
    setting: "设置",
    logOutPrompt: "真的要退出登录吗？",
    backTop: "回到顶部",
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
