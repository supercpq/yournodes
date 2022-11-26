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
      lazy: true,
      a: {
        // 没加载出来用的
        id: 0,
        title: "nothing",
        url: "#",
        description: "no data",
        likes: 0,
        reads: 0,
        pubTime: "--",
        imglink: "src/assets/avatar.svg",
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
          (res: any) => {
            // TODO:
            console.log("resByTitle", res.data);
            this.list = res.data.list;

            this.loading = false;
          },
          (err) => {
            console.log("!!!!", err);
            if (!this.show) {
              this.list.push(this.a);
            }
            this.loading = false;
          }
        );
      }
    },
    searchMore() {
      this.lazy = false;
      searchMoreByTitle({ input: this.inputSearch }).then(
        (res: any) => {
          console.log("resMore", res.data.list);
          this.list = [...this.list, ...res.data.list];
          this.loading = false;
          this.lazy = true;
        },
        (err) => {
          console.log(err);
          if (!this.show) {
            this.list.push(this.a);
          }
          this.loading = false;
          this.lazy = true;
        }
      );
    },
    searchdefaultOnce() {
      getarticle({ input: this.inputSearch }).then(
        (res: any) => {
          console.log("default", res.data);
          this.list = res.data.list;
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
