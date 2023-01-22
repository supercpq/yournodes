import { defineStore } from "pinia";
import { allArDatas, arData, arDataLable } from "../../api/ardata";

export const ardataStore = defineStore("ardata", {
  state: () => {
    return {
      lineData: [0],
      lineLable: [""],
      barData: [0],
      barLable: [""],
      chartlable: ["点击左侧文章列表以显示具体文章阅读数据", ""],
    };
  },
  actions: {
    getline(id: number, title: string) {
      this.chartlable[0] = title + "的阅读数据";
      arData({ id }).then(
        (res: any) => {
          // console.log("res", res);
          this.lineData = res.lineData;
          this.lineLable = res.lineLable;
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    getardataAll() {
      allArDatas().then(
        (res: any) => {
          this.barData = res.barData;
          this.barLable = res.barLable;
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
    getChartLable() {
      arDataLable().then(
        (res: any) => {
          this.chartlable[1] = res.chartlable; //获取第二个图标的说明文字（第一个不用，第一个就是文章名）
        },
        (err) => {
          console.log(err.message);
        }
      );
    },
  },
});
