import { defineStore } from "pinia";
import { chatAi } from "../../api/chatAi";
import _ from "lodash";
import axios from "axios";
// import https from "https";
type Theme = "light" | "dark";
// let timer: ReturnType<typeof setTimeout>;
const timers: Array<NodeJS.Timer> = [];
// 保存用于跳转的路由
export const chatAiStore = defineStore("chatAi", {
  state: () => {
    return {
      disable: false,
      Temperature: 0.9,
      MaxLength: 150,
      TopP: 1,
      frequencyPenalty: 0,
      presencePenalty: 0.6,
      local: true,
      md: false,
      timers,
      finished: true,
      // timer,
      prompt: [
        "AI: I am an AI. How can I help you today?(Recommended language: English)",
      ],
      theme: "light" as Theme,
    };
  },
  getters: {
    getChat: (state) => {
      return state.prompt;
    },
    getTimers: (state) => {
      return state.timers.length > 0;
    },
  },
  actions: {
    async submitChat(hInput: string) {
      if (this.local) {
        this.localChat(hInput);
      } else {
        const input = "Human:" + hInput;
        this.prompt.push(input);
        const chatData = {
          Temperature: this.Temperature,
          MaxLength: this.MaxLength,
          TopP: this.TopP,
          frequencyPenalty: this.frequencyPenalty,
          presencePenalty: this.presencePenalty,
          prompt: this.prompt,
        };
        if (this.prompt.length > 60) {
          this.prompt = this.prompt.slice(-30);
        }
        chatAi(chatData).then(
          (res: any) => {
            if (res.status == 0) {
              // clearInterval(this.timer);
              const index = this.prompt.length;
              const chat = "AI:" + (res.chat || "");
              if (this.md) {
                this.prompt.push(chat);
              } else {
                this.setAiChat(index, chat);
              }
              // this.prompt.push(chat[0]);
              // let i = 1;
              // this.timer = setInterval(() => {
              //   this.prompt[index] += chat[i++];
              //   if (this.prompt[index].length === chat.length || !chat[i]) {
              //     clearInterval(this.timer);
              //   }
              // }, 20);
            } else {
              this.prompt.push("AI:" + res.message);
            }
          },
          (err) => {
            this.prompt.push("AI:" + err.message);
          }
        );
      }
    },
    setAiChat(index: number, chat: string) {
      this.prompt.push(chat[0]);
      let i = 1;
      const timer: NodeJS.Timer = setInterval(() => {
        this.prompt[index] += chat[i++];
        if (this.prompt[index].length === chat.length || !chat[i]) {
          // console.log(this.timers);
          clearInterval(timer);
          const lastTimer = this.timers.slice(-1);
          const nowTimer = _.remove(this.timers, function (n) {
            return n === timer;
          });
          if (nowTimer === lastTimer) {
            this.finished = true;
          }
          // console.log(this.timers, timer);
        }
      }, 20);
      this.timers.push(timer);
      this.finished = false;
    },
    async localChat(input: string) {
      let index = 0;
      this.prompt.push("Human:" + input);
      interface oneChat {
        role: string;
        content: string;
      }
      const pro: Array<oneChat> = [];
      this.prompt.forEach((element) => {
        if (index++ % 2 == 0) {
          pro.push({
            role: "assistant",
            content: element.slice(3, 6),
          });
        } else {
          pro.push({
            role: "user",
            content: element.slice(6, element.length),
          });
        }
      });
      const dataString = JSON.stringify({
        messages: pro,
        tokensLength: this.MaxLength,
        model: "gpt-3.5-turbo",
      });
      // const agent = new https.Agent({
      //   rejectUnauthorized: false,
      // });
      const customConfig = {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
          "Content-Type": "application/json",
        },
      };
      const url = "https://api.aioschat.com/";
      // 在 axios 请求时，选择性忽略 SSL
      axios
        .post(url, dataString, { ...customConfig })
        .then((res) => {
          // clearInterval(this.timer);
          const chat = "AI:" + (res.data.choices[0].text || "");
          const index = this.prompt.length;
          if (this.md) {
            this.prompt.push(chat);
          } else {
            this.setAiChat(index, chat);
          }
          // this.prompt.push(chat[0]);
          // let i = 1;
          // this.timer = setInterval(() => {
          //   this.prompt[index] += chat[i++];

          //   if (
          //     this.prompt[index].length === chat.length ||
          //     typeof chat[i] === "undefined"
          //   ) {
          //     // console.log(
          //     //   this.prompt[index].length === chat.length,
          //     //   typeof chat[i] === "undefined",
          //     //   !chat[i]
          //     // );
          //     clearInterval(this.timer);
          //   }
          // }, 20);
        })
        .catch((err) => {
          this.prompt.push("AI:" + err.message);
        });
    },
    undoAiChat() {
      if (this.prompt.length > 2 && this.prompt.length % 2 === 1) {
        // clearInterval(this.timer);
        if (!this.finished) {
          const timer = this.timers.pop();
          clearInterval(timer);
        }
        const lastChat = this.prompt[this.prompt.length - 2];
        navigator.clipboard.writeText(lastChat.slice(6, lastChat.length));
        this.prompt = this.prompt.slice(0, this.prompt.length - 2);
        // console.log(this.prompt);
      }
    },
    clear() {
      // clearInterval(this.timer);
      this.timers.forEach((ele) => {
        clearInterval(ele);
      });
      this.timers.length = 0;
      this.finished = true;
      this.prompt = [
        "AI: I am an AI. How can I help you today?(Recommended language: English)",
      ];
    },
    setLocal(isLocal: boolean) {
      this.local = isLocal;
    },
    setTheme(th: Theme) {
      const themeList: Array<Theme> = ["light", "dark"];
      this.theme = themeList.includes(th) ? th : "light";
    },
    setmd(ismd: boolean) {
      this.md = ismd;
    },
  },
});
