// /user/myLikes
import { MockMethod } from "vite-plugin-mock";
interface searchLike {
  articaName: string;
  articalLink: string;
  articalImgLink: string;
  articalID: number;
}
var list = <searchLike[]>[];
var a: searchLike = {
  articaName: "superxxx123456789",
  articalLink: "student",
  articalImgLink:
    "https://p3-passport.byteimg.com/img/mosaic-legacy/3791/5070639578~180x180.png",
  articalID: 1231241,
};
for (var i = 0; i < 30; i++) {
  a.articaName = "once data superxxx123456789";
  a.articalID++;
  list.push(a);
}

export default [
  {
    url: "/user/myLikes",
    method: "get",
    timeout: 500,
    response: () => {
      return {
        code: 0,
        data: {
          status: 0,
          dataLikes: list,
        },
      };
    },
  },
] as MockMethod[];
