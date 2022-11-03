import { defineStore } from "pinia";
import {
  searchByTitle,
  searchMoreByTitle,
  getarticle,
  getMorearticle,
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
}

export const searchInputStore = defineStore("searchInput", {
  state: () => {
    return {
      list: <searchInputItem[]>[],
      loading: true,
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
      if (url != "") {
        window.open(url + input, "_blank");
      } else {
        var seIn = { input };
        searchByTitle(seIn).then(
          (res) => {
            console.log(res);
          },
          (err) => {
            console.log(err);
          }
        );
      }
    },
    searchInputMore() {},
    searchdefaultOnce() {},
    searchdefaultMore() {},
  },
});
