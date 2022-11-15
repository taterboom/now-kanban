import githubTrendingResolver from "./githubTrending/resolver"
import hacknewsResolver from "./hacknews/resolver"
import indiehackerExploreResolver from "./indiehackerExplore/resolver"
import jikeDailyResolver from "./jikeDaily/resolver"
import oschinaHotResolver from "./oschinaHot/resolver"
import producthuntRankResolver from "./producthuntRank/resolver"
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
  xueqiuLiveResolver,
  producthuntRankResolver,
  indiehackerExploreResolver,
]

export default resolvers