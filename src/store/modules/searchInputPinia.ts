import { defineStore } from "pinia";
import {
  searchByTitle,
  searchMoreByTitle,
  getarticle,
  // getMorearticle,
} from "../../api/mainface";
import { getMyList } from "../../api/ardata";
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
        imglink:
          "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
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
            // console.log("resByTitle", res.data);
            this.list = res.list;
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
      searchMoreByTitle({
        input: this.inputSearch,
        num: this.list.length,
      }).then(
        (res: any) => {
          // console.log("resMore", res.data.list);
          this.list = [...this.list, ...res.list];
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
    searchSelf() {
      this.lazy = false;
      if (this.list.length === 0) {
        this.loading = true;
      }
      console.log("searchSelf");
      getMyList({ input: this.inputSearch, num: this.list.length }).then(
        (res: any) => {
          this.list = [...this.list, ...res.list];
          this.loading = false;
          this.lazy = true;
        },
        (err) => {
          console.log(err);
          if (!this.show) {
            this.list.push(this.a);
          }
          this.lazy = true;
          this.loading = false;
        }
      );
    },
    searchdefaultOnce() {
      getarticle({ input: this.inputSearch }).then(
        (res: any) => {
          // console.log("default", res.data);
          this.list = res.list;
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
