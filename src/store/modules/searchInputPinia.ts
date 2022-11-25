import { defineStore } from "pinia";
import {
  searchByTitle,
  searchMoreByTitle,
  getarticle,
  // getMorearticle,
} from "../../api/mainface";
import axios from "axios";
axios.defaults.timeout = 10000;
interface searchInputItem {
  id: number;
  title: string;
  url: string;
  description: string;
  likes: number;
  reads: number;
  pubTime: string;
  imglink?: string;
}

export const searchInputStore = defineStore("searchInput", {
  state: () => {
    return {
      list: <searchInputItem[]>[],
      inputSearch: "",
      loading: true,
      a: {
        // 没加载出来用的
        id: 0,
        title:
          "nothingnothingnothingnothingnothingnothingnothingnothingnothino datano datano datano datano datano datano datano datano datang",
        url: "#",
        description: "no data",
        likes: 0,
        reads: 0,
        pubTime: "--",
        imglink: "https://vitejs.dev/logo.svg",
      },
    };
  },
  getters: {
    show: (state) => {
      return state.list.length > 0;
    },
    allList: (state) => {
      return state.list;
    },
  },
  actions: {
    searchInputOnce(input: string, url: string) {
      if (!input.trim()) return;
      if (url.trim() != "") {
        window.open(url.trim() + input, "_blank");
      } else {
        this.loading = true;
        var seIn = { input };
        searchByTitle(seIn).then(
          (res) => {
            // TODO:
            console.log(res);
          },
          (err) => {
            console.log("!!!!", err);
            if (!this.show) {
              this.list.push(this.a);
            }
            // for (var i = 0; i < 30; i++) {
            //   this.a.id++;
            //   this.list.push(this.a);
            // }
            this.loading = false;
          }
        );
      }
    },
    searchMore() {
      searchMoreByTitle({ input: this.inputSearch }).then(
        (res) => {
          console.log(res);
          this.loading = false;
        },
        (err) => {
          console.log(err);
          if (!this.show) {
            this.list.push(this.a);
          }
          this.loading = false;
        }
      );
    },
    searchdefaultOnce() {
      getarticle({ input: this.inputSearch }).then(
        (res) => {
          console.log(res);
          this.loading = false;
        },
        (err) => {
          console.log(err);
          if (!this.show) {
            this.list.push(this.a);
          }
          this.loading = false;
        }
      );
    },
  },
});
