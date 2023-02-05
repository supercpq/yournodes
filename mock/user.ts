// user/moreLike
import { MockMethod } from "vite-plugin-mock";
interface searchLike {
  articaName: string;
  articalLink: string;
  articalImgLink: string;
  articalID: number;
}
const list = <searchLike[]>[];
const a: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "/reading?ar_id=10",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 1231241,
};
for (let i = 0; i < 20; i++) {
  a.articaName = "once data superxxx123456789";
  a.articalID++;
  list.push(a);
}
const list1 = <searchLike[]>[];

const b: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "/reading?ar_id=10",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 12312411,
};
for (let i = 0; i < 20; i++) {
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
        pubkey: `-----BEGIN PUBLIC KEY-----\nMFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBANDl0XBfBU8SM3Ppj6kwrHc2WSKNdGgC\nNPWDeB1t50jcSV9YZ02Z7Ne0hbXt1vh7q6PkWwfTiozNjofRNofwhWkCAwEAAQ==\n-----END PUBLIC KEY-----`,
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
          company: "大连理工大学",
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
# VUE.JS 设计与实现 响应式系统 笔记
## 响应式系统的作用与实现
### 响应式数据与副作用函数
- 副作用函数：就是会产生副作用的函数，如：
 \u0060\u0060\u0060javascript
 function effect() {
     document.body.innerText = "hello vue3"
 }
 \u0060\u0060\u0060
 effect函数执行会间接影响到其他函数的执行。
 - 响应式数据：当某个对象的值变化后，副作用函数自动重新执行，那么这个对象就是响应式数据。
 ### 响应式数据的基本实现：
 我们需要拦截一个对象的读取和设置操作，在vue2中，使用的是Object.defineProperty, vue3中使用代理对象Proxy来实现。<br>
 
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b8c51c14b1b4a77850df3c1fcb146ca~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a56123c2da1840d2ad6d2036c0668fcb~tplv-k3u1fbpfcp-watermark.image?)
首先创建一个存储副作用函数的桶bucket，是Set类型，然后定义原始数据data，原始数据的代理对象obj，设置了get和set的拦截函数，拦截读取和设置操作。
- 读取属性时，将副作用函数effect添加到桶里，再返回属性值。
- 当设置属性时，先更新原始数据，再将副作用函数取出并重新执行<br>
采用Proxy实现：
\u0060\u0060\u0060javascript
// 存副作用的桶
const bucket = new Set()
// 原始数据
const data = { text: 'hello world' }
// 代理对象
const obj = new Proxy(data, {
    // 拦截读取操作
    get(target, key) {
        // 将副作用函数加入桶
        bucket.add(effect)
        // 返回属性值
        return target[key]
    },
    // 拦截设置操作
    set(target, key, newVal) {
        // 修改原始数据
        target[key] = newVal
        // 将副作用函数从桶中取出执行
        bucket.forEach(fn => fn())
        // 返回true代表操作成功
        return true
    }
})
// 副作用函数
function effect() {
    document.body.innerText = obj.text
}
// 执行副作用函数，触发读取
effect()
// 1秒后修改响应式数据
setTimeout(() => {
    obj.text = 'hello vue3'
}, 1000)
\u0060\u0060\u0060
### 设计一个完善的响应式系统
上面用例中，如果响应式函数不叫effect，那代码将不能正常工作，需要一个注册副作用函数的机制：<br>
定义一个全局变量activeEffect，作用是存储注册的副作用函数，截止定义effect函数，用来注册副作用函数的函数。
而且，我们没有在副作用函数与被操作的目标字段之间建立明确的联系，导致无论读取和设置哪个属性，都会进行把副作用函数进行放入取出。所以我们需要重新设置数据类型：<br>
使用WeakMap配合Map构建了新的“桶”结构，（WeakMap是弱引用，不影响垃圾回收的工作，当用户代码对一个对象没有引用关系的时，WeakMap不会阻止垃圾回收器回收该对象）

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/00e0c43fa47d41abaf8d3a43d4e6a683~tplv-k3u1fbpfcp-watermark.image?)
\u0060\u0060\u0060javaScript
// 存储副作用函数的桶
const bucket = new WeakMap()
// 用一个全局变量储存被注册的副作用函数
let activeEffect
// 用于注册副作用函数
function effect(fn) {
    activeEffect = fn
    fn()
}
const obj = new Proxy(data, {
    get(target, key) {
        track(target, key)
        return target[key]
    },
    set(target, key, newVal) {
        target[key] = newVal
        trigger(target, key)
    }
})

// 在get中调用track追踪变化
function track(target, key) {
    if(!activeEffect) return
    let depsMap = bucket.get(target)
    if(!depsMap) {
        bucket.set(key, (depsMap = new Set()))
    }
    let deps = depsMap.get(key)
    if(!deps) {
        depsMap.set(key, (deps = new Set()))
    }
    deps.add(activeEffect)
}

//  在set中调用trigger触发变化
function trigger(target, key) {
    const depsMap = bucket.get(target)
    if(!depsMap) return
    const effects = depsMap.get(key)
    effects && effects.forEach(fn => fn())
}
\u0060\u0060\u0060
### 分支切换与cleanup
分支切换可能导致遗留的副作用函数
\u0060\u0060\u0060javascript
const data = { ok: true, text: 'hello world' } 
const obj = new Proxy(data, { /* ... */ }) 
effect(function effectFn() { 
document.body.innerText = obj.ok ? obj.text : 'not' 
})
\u0060\u0060\u0060
比如上面的情况中，obj.ok == false时，修改obj.text仍然会导致副作用函数的执行。<br>
解决上述问题的思路也很简单，每次副作用函数执行时，我们可以先把它从所有与之关联的依赖集合中删除，当副作用函数执行完毕后，会重新建立联系，但新的联系中不会包含遗留的副作用函数。<br>
\u0060\u0060\u0060javascript
// cleanup的实现
function cleanup(effectFn) {
    // 遍历effectFn.deps数组来获取所有相关的依赖集合
    for (let i = 0; i < effectFn.deps.length; i++) {
        // deps：依赖集合
        const deps = effectFn.deps[i]
        // 将 effectFn 从依赖集合中移除
        deps.delete(effectFn)
    }
    // 最后需要重置 effectFn.deps 数组
    effectFn.deps.length = 0
}
\u0060\u0060\u0060

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b3059047854bc9b1bf3e8624ca508b~tplv-k3u1fbpfcp-watermark.image?)

### 嵌套的effect与effect栈
effect是可以发生嵌套的，通常发生在组件嵌套的场景中，即父子组件关系，这时，要避免响应式数据与副作用函数之间建立的联系发生错乱，我们需要使用副作用函数栈来存储不同的副作用函数，当一个副作用函数执行完成，将其从栈中弹出，当读取相应式数据的时候，被读取的响应式数据只会与当前栈顶的副作用函数建立响应联系，从而解决问题。
\u0060\u0060\u0060js
const effectStack = []  // 新增

function effect(fn) {
  const effectFn = () => {
    cleanup(effectFn)
    // 当调用 effect 注册副作用函数时，将副作用函数赋值给 activeEffect
    activeEffect = effectFn
   // 在调用副作用函数之前将当前副作用函数压入栈中
    effectStack.push(effectFn)  // 新增
    fn()
    // 在当前副作用函数执行完毕后，将当前副作用函数弹出栈，并把 activeEffect 还原为之前的值
    effectStack.pop()  // 新增
    activeEffect = effectStack[effectStack.length - 1]  // 新增
  }
  // activeEffect.deps 用来存储所有与该副作用函数相关的依赖集合   
  effectFn.deps = []  
  // 执行副作用函数
  effectFn()
}
\u0060\u0060\u0060
### 避免无限递归循环
举例：
\u0060\u0060\u0060js
const data = { foo: 1 }
const obj = new Proxy(data, {/*  */})

effect(() => obj.foo++)
\u0060\u0060\u0060
会引起栈溢出。
解决办法：问题是读取和设置操作是在同一个副作用函数内进行的，无论是track还是trigger时要出发的执行副作用都是activeEffect,所以，我们可以在trigger动作发生时增加守卫条件，如果trigger触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行。
 \u0060\u0060\u0060js
 function trigger(target, key) {
   const depsMap = bucket.get(target)
   if (!depsMap) return
   const effects = depsMap.get(key)
    
   const effectsToRun = new Set()
   effects && effects.forEach(effectFn => {
     // 如果 trigger 触发执行的副作用函数与当前正在执行的副作用函数相同，则不触发执行
    if (effectFn !== activeEffect) {  // 新增
        effectsToRun.add(effectFn)
    }
})
   effectsToRun.forEach(effectFn => effectFn())
   // effects && effects.forEach(effectFn => effectFn())
}
 \u0060\u0060\u0060
 ### 调度执行
 可调度：当trigger动作触发副作用函数重新执行时，有能力决定副作用函数执行的时机，次数以及方式（比如在过渡状态时不调用副作用函数）
 \u0060\u0060\u0060js
 function trigger(target, key) {
  const depsMap = bucket.get(target)
  if (!depsMap) return
  const effects = depsMap.get(key)

  const effectsToRun = new Set()
  effects && effects.forEach(effectFn => {
    if (effectFn !== activeEffect) {
      effectsToRun.add(effectFn)
    }
  })
  effectsToRun.forEach(effectFn => {
    if (effectFn.options.scheduler) {
    // 如果副作用函数存在调度器，则调用该调度器，并将副作用函数组为参数传递
      effectFn.options.scheduler(effectFn)
    } else {
    // 否则直接执行副作用函数
      effectFn()
    }
  })
  // effects && effects.forEach(effectFn => effectFn())
}


// 定义一个任务队列
const jobQueue = new Set()
const p = Promise.resolve()
// 一个标志代表是否正在刷新队列
let isFlushing = false
function flushJob() {
// 队列整整刷新，什么也不做
  if (isFlushing) return
  isFlushing = true
// 设为true代表正在刷新
  p.then(() => {
    jobQueue.forEach(job => job())
  }).finally(() => {
  // 结束后重置 isFlushing
    isFlushing = false
  })
}

effect(() => {
  console.log(obj.foo)
}, {
 scheduler(fn) {
 // 每次调度时，将副作用函数添加到 jobQueue队列中
    jobQueue.add(fn)
 // 调用 flushJob 刷新队列
    flushJob()
  }
})

obj.foo++
obj.foo++
 \u0060\u0060\u0060
 ### 计算属性computed与lazy
 - lazy属性
    - 有些场景下，不希望副作用函数立即执行，而是在需要它的时候才执行（例如计算属性）
    - 通过在optioons中添加lazy属性来达到目的，当options.lazy属性为true时，不立即执行副作用函数。
 \u0060\u0060\u0060js
 effect() {
     // 指定了 lazy 选项，这个函数不会立即执行
     () => {
     consolo.log(obj.foo)
     },
     //options
     {
         lazy: true
     }
 }
 \u0060\u0060\u0060
 - 计算属性
     - 被动触发
     - 缓存


使用两个变量value和dirty，其中value用来缓存上一次计算的值，dirty用来标识是否要重新计算。dirty为true时，才重新计算，否则直接用value。当读取计算属性的值时，我们可以手动调用\u0060track\u0060函数进行追踪；当计算属性依赖的响应式数据发生变化时，我们可以手动调用\u0060trigger\u0060函数触发响应：
\u0060\u0060\u0060js
function computed(getter){
	let value 
  let dirty = true

  const effectFn = effect(getter,{
  	lazy:true,
    scheduler(){
      if(!dirty){
        dirty = true
        //当计算属性依赖的响应式数据变化时，手动调用trigger函数触发响应
        trigger(obj,'value')
      }
    }
  })

  const obj = {
    get value(){
      if(dirty){
        value = effectFn()
        dirty = false
      }
      // 当读取value时，手动调用track函数进行追踪
      track(obj,'value')
      return value
    }
  }
  return obj
}
\u0060\u0060\u0060
 ### watch实现原理
 所谓 watch，其本质就是观测一个响应式数据，当数据发生变化时通知并执行相应的回调函数。<br>
 \u0060watch\u0060的实现本质上就是利用了\u0060effect\u0060以及\u0060options.scheduler\u0060选项，如以下代码所示：\u0060watch\u0060的实现本质上就是利用了\u0060effect\u0060以及\u0060options.scheduler\u0060选项，如以下代码所示：
\u0060\u0060\u0060js
effect(()=>{
  console.log(obj.foo)
},{
  scheduler(){
    //当obj.foo的值变化时，会执行scheduler调度函数
  }
})
\u0060\u0060\u0060
- 一个watch本身会创建一个effect，当这个effect依赖的响应式数据发生变化时，会执行该scheduler中执行用户通过watch函数注册的回调函数即可。
- 执行回调的watch，通过添加新的immediate选项来实现
- 如何控制回调函数的执行时机，通过flush选项来制定回调函数具体的执行时机，本质上是利用了调用器和一步的微任务队列。
\u0060\u0060\u0060js
function watch(source,obj){
	let getter
  if(typeof source === 'function'){
    getter = source
  }else{
    getter = () => traverse(source)
  }

  //定义旧值与新值
  let objValue, newValue
  //使用effect注册副作用函数时，开启lazy选项，并把返回值存储到effectFn中以便后续手动调用
  const effectFn = effect(
    ()=> getter(),
    {
      lazy:true,
      scheduler(){
        //在scheduler 中重新执行副作用函数，得到的是新值
        newValue = effectFn()
        // 将旧值和新值作为回调函数的参数
        cb(newValue,oldValue)
        //更新旧值，不然下一次会得到错误的旧值
        oldValue = newValue
      }
    }
  )
  //手动调用副作用函数，拿到的值就是旧值
  oldValue = effectFn()
}
\u0060\u0060\u0060
通过选项参数\u0060immdiate\u0060来指定回调是否需要立即执行,当\u0060immediate\u0060选项存在并且为\u0060true\u0060时，回调函数会在该\u0060watch\u0060创建时立即执行一次
 ### 过期的副作用
 竞态问题:

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56c16569ebec4e459a93340a6608bd6e~tplv-k3u1fbpfcp-watermark.image?)
先发的请求后返回结果，会导致A本该被视为过期无效的数据被作为最新的数据。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fae6900f51ba418c9f6eeb8366af617e~tplv-k3u1fbpfcp-watermark.image?)

在\u0060Vue.js\u0060中，\u0060watch\u0060函数的回调函数接受第三个参数\u0060onInvalidate\u0060，它是一个函数，类似于时间监听器，我们可以用\u0060onInvalidate\u0060函数注册一个回调，这个回调函数会在当副作用函数过期时执行：

\u0060\u0060\u0060js
watch(obj,async(newValue,oldValue,onInvalidate)=>{
  //定义一个标志，代表当前副作用函数是否过期，默认为false，代表没有过期
  let expired = false
  //调用onInvalidate() 函数注册一个过期回调
  onInvalidate(() =>{
    //当过期时，将expired设置为true
    expired = true
  })

  //发送网络请求
  const res = await fetch('/path/to/request')

  //只有当该副作用函数的执行没有过期时，才会执行后续操作
  if(!expired){
    finalData = res
  }
})
\u0060\u0060\u0060

如上面的代码所示，在发送请求之前，我们定义了\u0060expired\u0060标志变量，用来标识当前副作用函数的执行是否过期；接着调用\u0060onInvalidate\u0060函数注册了一个过期回调，当该副作用函数的执行过期时将\u0060expired\u0060标志变量设置为\u0060true\u0060；最后只有当没有过期时才采用请求结果，这样就可以有效的避免上述问题了。

那么\u0060Vue.js\u0060是怎么做到的呢？换句话说，\u0060onInvalidate\u0060的原理是什么呢？其实很简单，在\u0060watch\u0060内部每次检测到变更后，在副作用函数重新执行之前，会先调用我们通过\u0060onInvalidate\u0060函数注册的过期回调，仅此而已，如下代码所示：

\u0060\u0060\u0060js
function watch(source,cb,options={}){
  let getter
  if(typeof source === 'function'){
    getter = source
  }else{
    getter = () => traverse(source)
  }

  let oldValue,newValue

  //cleanup 用来存储用户注册的过期回调
  let cleanup
  //定义onInvalidate函数  
  function onInvalidate(fn){
    //将过期回调存储到cleanup中
    cleanup = fn
  }

  const job = ()=>{
    newValue = effectFn()
    //在调用回调函数cb之前，先调用过期回调
    if(cleanup){
      cleanup()
    }
    //将onInvalidate作为回调函数的第三个参数，以便用户使用
    cb(oldValue,newValue,onInvalidate)
    oldValue = newValue
  }

  const effectFn = effect(
    //执行getter
    ()=>getter(),
    {
      lazy:true,
      scheduler:()=>{
        if(options.flush === 'post'){
          const p = Promise.resolve()
          p.then(job)
        }else{
          job()
        }
      }
    }
  )

  if(options.immediate){
    job()
  }else{
    oldValue = effectFn()
  }
}
\u0060\u0060\u0060
在这段代码中，我们首先定义了\u0060cleanup\u0060变量，这个变量用来存储用户通过\u0060onInvalidate\u0060函数注册的过期函回调。可以看到\u0060onInvalidate\u0060函数的实现非常简单，只是把过期回赋值给了\u0060cleanup\u0060变量。这里的关键点在\u0060job\u0060函数内，每次执行回调函数\u0060cb\u0060之前，先检查是否存在过期回调，如果存在，则执行过期回调函数\u0060cleanup\u0060。最后我们把\u0060onInvaidate\u0060函数作为回调函数的第三个参数传递给\u0060cb\u0060，以便用户使用。       `,
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
