import { defineStore } from "pinia";
import {
  searchByTitle,
  searchMoreByTitle,
  getarticle,
  getMorearticle,
} from "src/api/mainface";
import axios from "axios";
axios.defaults.timeout = 10000;
interface searchInputItem {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  stars: number;
  forks: number;
}

export const githubHotStore = defineStore("searchInput", {
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
    searchInputOnce(lang: string = "vue") {},
    searchInputMore() {},
    searchdefaultOnce() {},
    searchdefaultMore() {},
  },
});
