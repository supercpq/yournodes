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
}

export const searchInputStore = defineStore("searchInput", {
  state: () => {
    return {
      list: <searchInputItem[]>[],
      inputSearch: "",
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
    searchMore() {
      searchMoreByTitle({ input: this.inputSearch }).then(
        (res) => {
          console.log(res);
          this.loading = false;
        },
        (err) => {
          console.log(err);
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
        }
      );
    },
  },
});
