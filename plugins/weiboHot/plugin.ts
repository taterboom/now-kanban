import { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql"
import { pick } from "lodash"
import { Plugin } from "../Plugin"

var GraphQLWeiboHotItem = new GraphQLObjectType({
  name: "WeiboHotItem",
  fields: {
    card_type: { type: GraphQLInt },
    desc: { type: GraphQLString },
    icon: { type: GraphQLString },
    itemid: { type: GraphQLString },
    pic: { type: GraphQLString },
    scheme: { type: GraphQLString },
    desc_extr: { type: GraphQLString },
  },
})

const plugin = new Plugin({
  weiboHotItems: {
    type: new GraphQLList(GraphQLWeiboHotItem),
    resolve: async () => {
      const result = await fetch(
        `https://m.weibo.cn/api/container/getIndex?containerid=106003type%3D25%26t%3D3%26disable_hot%3D1%26filter_type%3Drealtimehot&title=%E5%BE%AE%E5%8D%9A%E7%83%AD%E6%90%9C&show_cache_when_error=1&extparam=seat%3D1%26dgr%3D0%26c_type%3D30%26mi_cid%3D100103%26cate%3D10103%26lcate%3D1001%26refresh_type%3D-1%26filter_type%3Drealtimehot%26pos%3D0_0%26region_relas_conf%3D0%26display_time%3D1667355164%26pre_seqid%3D1376087905&luicode=10000011&lfid=231583`
      ).then((res) => res.json())

      const data =
        result.data?.cards?.[0]?.card_group
          ?.filter((item: any) => !!item.desc_extr)
          .map((item: any) =>
            pick(item, ["card_type", "desc", "icon", "itemid", "pic", "scheme", "desc_extr"])
          ) || []
      return data
    },
  },
})

export default plugin
