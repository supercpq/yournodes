import { defineStore } from "pinia";
import { chatAi } from "../../api/chatAi";
import axios from "axios";
// import https from "https";
type Theme = "light" | "dark";
let timer: ReturnType<typeof setTimeout>;
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
      timer,
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
              const index = this.prompt.length;
              const chat = "AI:" + (res.chat || "");
              this.prompt.push(chat[0]);
              let i = 1;
              this.timer = setInterval(() => {
                this.prompt[index] += chat[i++];
                if (this.prompt[index].length === chat.length) {
                  clearInterval(this.timer);
                }
              }, 20);
            } else {
              this.prompt.push(res.message);
            }
          },
          (err) => {
            this.prompt.push(err.message);
          }
        );
      }
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
            content: element.slice(0, 6),
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
          const chat = "AI:" + (res.data.choices[0].text || "");
          const index = this.prompt.length;
          this.prompt.push(chat[0]);
          let i = 1;
          this.timer = setInterval(() => {
            this.prompt[index] += chat[i++];
            if (this.prompt[index].length === chat.length) {
              clearInterval(this.timer);
            }
          }, 20);
        })
        .catch((err) => {
          this.prompt.push(err.message);
        });
    },
    undoAiChat() {
      if (this.prompt.length > 2) {
        clearInterval(this.timer);
        this.prompt = this.prompt.slice(0, this.prompt.length - 2);
        console.log(this.prompt);
      }
    },
    clear() {
      clearInterval(this.timer);
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
  },
});
