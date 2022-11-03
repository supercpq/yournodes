import { defineStore } from "pinia";
import axios from "axios";
axios.defaults.timeout = 10000;
interface githubHotItem {
  id: number;
  name: string;
  picUrl: string;
  description: string;
  stars: number;
  forks: number;
}

export const githubHotStore = defineStore("githubHotS", {
  state: () => {
    return {
      list: <githubHotItem[]>[],
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
    searchrepositories(lang: string = "vue") {
      lang = lang.trim().slice(0, 20);
      if (lang) {
        axios
          .get(
            `https://api.github.com/search/repositories?q=language:${lang}&sort=stars`
          )
          .then(
            (res) => {
              if (typeof res.data.errors != undefined) {
                console.log(this.show);
                // console.log(res.data.code)
                // console.log(res.data)
                // this.gridCon = '\'logoItems \'\'searchInput \'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist\'\'musiclist'
                this.list = [];
                console.log(this.list.length);
                for (let i in res.data.items) {
                  var a: githubHotItem = {
                    id: res.data.items[i].id,
                    name: res.data.items[i].full_name,
                    picUrl: res.data.items[i].html_url,
                    description: res.data.items[i].description,
                    stars: res.data.items[i].stargazers_count,
                    forks: res.data.items[i].forks_count,
                  };
                  this.list.push(a);
                  // console.log(res.data.result.songs[i].id, res.data.result.songs[i].name, res.data.result.songs[i].al.picUrl)
                }
                this.loading = false;
                // console.log(this.list);
                console.log(this.list.length);
              } else {
                if (!this.show) {
                  var a: githubHotItem = {
                    id: 0,
                    name: "nothing",
                    picUrl: "#",
                    description: "no data",
                    stars: 0,
                    forks: 0,
                  };
                  this.list.push(a);
                }
                this.loading = false;
              }
            },
            (err) => {
              // console.log('searchMusicListByName3')
              if (!this.show) {
                var a: githubHotItem = {
                  id: 0,
                  name: "nothing",
                  picUrl: "#",
                  description: "no data",
                  stars: 0,
                  forks: 0,
                };
                this.list.push(a);
              }
              console.log(err.message);
              this.loading = false;
            }
          );
      }
    },
  },
});
