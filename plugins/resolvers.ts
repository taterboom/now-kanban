import releasesResolver from "./Releases/resolver"
import baiduHotResolver from "./baiduHot/resolver"
import githubTrendingResolver from "./githubTrending/resolver"
import hacknewsResolver from "./hacknews/resolver"
import indiehackerExploreResolver from "./indiehackerExplore/resolver"
import jikeDailyResolver from "./jikeDaily/resolver"
import oschinaHotResolver from "./oschinaHot/resolver"
import producthuntRankResolver from "./producthuntRank/resolver"
import stackoverflowHotResolver from "./stackoverflowHot/resolver"
import stockResolver from "./stock/resolver"
import stockPriceResolver from "./stockPrice/resolver"
import v2exHotResolver from "./v2exHot/resolver"
import weiboHotResolver from "./weiboHot/resolver"
import xueqiuLiveResolver from "./xueqiuLive/resolver"

const resolvers = [
  githubTrendingResolver,
  hacknewsResolver,
  jikeDailyResolver,
  oschinaHotResolver,
  v2exHotResolver,
  weiboHotResolver,
  stockResolver,
  producthuntRankResolver,
  indiehackerExploreResolver,
  baiduHotResolver,
  xueqiuLiveResolver,
  stackoverflowHotResolver,
  stockPriceResolver,
  releasesResolver,
]

export default resolvers
