import { defineStore } from "pinia";
import { chatAi } from "../../api/chatAi";
type Theme = "light" | "dark";

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
    submitChat(hInput: string) {
      this.disable = true;
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
            this.prompt.push(res.chat[0]);
            let i = 1;
            const timer = setInterval(() => {
              this.prompt[index] += res.chat[i++];
              if (this.prompt[index].length === res.chat.length) {
                clearInterval(timer);
              }
            }, 20);
            this.disable = false;
          } else {
            this.prompt.push(res.message);
            this.disable = false;
          }
        },
        (err) => {
          this.prompt.push(err.message);
          this.disable = false;
        }
      );
    },
    setTheme(th: Theme) {
      const themeList: Array<Theme> = ["light", "dark"];
      this.theme = themeList.includes(th) ? th : "light";
    },
  },
});
