// user/moreLike
import { MockMethod } from "vite-plugin-mock";
interface searchLike {
  articaName: string;
  articalLink: string;
  articalImgLink: string;
  articalID: number;
}
var list = <searchLike[]>[];
var a: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "/reading?ar_id=10",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 1231241,
};
for (var i = 0; i < 20; i++) {
  a.articaName = "once data superxxx123456789";
  a.articalID++;
  list.push(a);
}
var list1 = <searchLike[]>[];

var b: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "/reading?ar_id=10",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 12312411,
};
for (var i = 0; i < 20; i++) {
  b.articaName = "more data superxxx123456789";
  b.articalID++;
  list1.push(b);
}
export default [
  {
    url: "/api/pubkey",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        pubkey: `MIIBCgKCAQEA5mSIryzUoK4K5DLZErIbHnRol27/A0ZVrhL1adaiUSM8Dv2Xk5I1
        rUZ75ZshmeJbDphc3vH79fs2/inWVYKsr/MDdL17gVh6mK8xvJ1fFPK/asiB9JnG
        aEXNqtIMunKWJejADFeWHuUoRfdJ12Nxucw+PPyZu7U9i24MGpsgH8ddu+PsMS8P
        nUxdf7O63obDOmfkiD82No/MQzT5dq1EHLsTdjOhfJMCPScdKugVsAAl7KzlEugo
        k4dRo1nKotzVYxwhCKFRWf7PSKxAN+DnDQMKCZsD2Qi+iarF82bck37Cvw9gDB2D
        CP+/0He1JwxRODpnYFb7dpdmHdQaX+O9bQIDAQAB`,
      };
    },
  },
  {
    url: "/api/reguser",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        name: "superCPQ",
        accessToken: "thisistokenstring.superCPQ",
        expires: "32285982150", // 2024-02-02T12:04:14.000Z
        id: "123456",
      };
    },
  },
  {
    url: "/api/refreshToken",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        name: "superCPQ",
        accessToken: "thisistokenstring.superCPQ",
        expires: "32285982150", // 2024-02-02T12:04:14.000Z
        id: "123456",
      };
    },
  },
  {
    url: "/api/login",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        name: "superCPQ",
        accessToken: "thisistokenstring.superCPQ",
        expires: "32285982150", // 2024-02-02T12:04:14.000Z
        id: "123456",
      };
    },
  },
  {
    url: "/user/myLikes",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        dataLikes: list,
      };
    },
  },
  {
    url: "/user/moreLikes",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        dataLikes: list1,
      };
    },
  },
  // /user/baseInfo
  {
    url: "/user/baseInfo",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        info: {
          avatarLink: "https://avatars.githubusercontent.com/u/87625173?v=4",
          userName: "superCPQ",
          profession: "程序员",
          userMail: "supercpq@outlook.com",
          id: "123456",
        },
      };
    },
  },
  {
    url: "/user/infoTabs",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,

        status: 0,
        tabs: [
          {
            tabName: "个人资料",
            componentName: "basicSetting",
            tabUrl: "myinfo/setting/setUserInfo",
            tabIcon: "/infoset.svg",
          },
          {
            tabName: "账号设置",
            componentName: "accountSetting",
            tabUrl: "myinfo/setting/setAccountInfo",
            tabIcon: "/accountset.svg",
          },
          {
            tabName: "待开发",
            componentName: "",
            tabUrl: "myinfo/setting",
          },
        ],
      };
    },
  },
  {
    url: "/myinfo/settingbase",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/myinfo/settingnewimg",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/reading/like",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/api/reading/likeinfo",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        options: [
          {
            icon: "like.svg",
            counts: 100,
            active: false,
            activeIcon: "likeit.svg",
            disactiveIcon: "like.svg",
          },
        ],
      };
    },
  },
  {
    url: "/api/reading/content",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        content: `

# 1VUE.JS 设计与实现 响应式系统 笔记
## 2响应式系统的作用与实现
### 3响应式数据与副作用函数
- 副作用函数：就是会产生副作用的函数，如：
### 4设计一个完善的响应式系统
上面用例中，如果响应式函数不叫effect，那代码将不能正常工作，需要一个注册副作用函数的机制：<br>
定义一个全局变量activeEffect，作用是存储注册的副作用函数，截止定义effect函数，用来注册副作用函数的函数。
而且，我们没有在副作用函数与被操作的目标字段之间建立明确的联系，导致无论读取和设置哪个属性，都会进行把副作用函数进行放入取出。所以我们需要重新设置数据类型：<br>
使用WeakMap配合Map构建了新的“桶”结构，（WeakMap是弱引用，不影响垃圾回收的工作，当用户代码对一个对象没有引用关系的时，WeakMap不会阻止垃圾回收器回收该对象）
        
### 5响应式数据与副作用函数
- 副作用函数：就是会产生副作用的函数，如：
### 6设计一个完善的响应式系统
上面用例中，如果响应式函数不叫effect，那代码将不能正常工作，需要一个注册副作用函数的机制：<br>
定义一个全局变量activeEffect，作用是存储注册的副作用函数，截止定义effect函数，用来注册副作用函数的函数。
而且，我们没有在副作用函数与被操作的目标字段之间建立明确的联系，导致无论读取和设置哪个属性，都会进行把副作用函数进行放入取出。所以我们需要重新设置数据类型：<br>
使用WeakMap配合Map构建了新的“桶”结构，（WeakMap是弱引用，不影响垃圾回收的工作，当用户代码对一个对象没有引用关系的时，WeakMap不会阻止垃圾回收器回收该对象）
       
### 7响应式数据与副作用函数
- 副作用函数：就是会产生副作用的函数，如：
### 8设计一个完善的响应式系统
上面用例中，如果响应式函数不叫effect，那代码将不能正常工作，需要一个注册副作用函数的机制：<br>
定义一个全局变量activeEffect，作用是存储注册的副作用函数，截止定义effect函数，用来注册副作用函数的函数。
而且，我们没有在副作用函数与被操作的目标字段之间建立明确的联系，导致无论读取和设置哪个属性，都会进行把副作用函数进行放入取出。所以我们需要重新设置数据类型：<br>
使用WeakMap配合Map构建了新的“桶”结构，（WeakMap是弱引用，不影响垃圾回收的工作，当用户代码对一个对象没有引用关系的时，WeakMap不会阻止垃圾回收器回收该对象）
       `,
        //"## 123",
        title: "hello, your news,这是supercpq的一篇博客的具体内容",
        // title: "once data",
        isEdit: true, // 是否显示编辑按钮
      };
    },
  },
  {
    url: "/api/refreshToken",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        accessToken: "agauwrhgahjioatenhjtlmjimoa",
        expires: 4827988371000,
        name: "supercpq",
      };
    },
  },
  {
    url: "/api/code",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
        code: 123,
      };
    },
  },
  {
    url: "/api/updatepwd",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        status: 0,
      };
    },
  },
  {
    url: "/api/img/upload",
    method: "post",
    timeout: 500,
    response: () => {
      return {
        url: "https://avatars.githubusercontent.com/u/87625173?v=4",
      };
    },
  },
] as MockMethod[];
