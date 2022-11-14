import GithubTrending from "../plugins/githubTrending/Component"
import Grid from "../components/Grid"
import JikeDaily from "../plugins/jikeDaily/Component"
import OschinaHot from "../plugins/oschinaHot/Component"
import V2exHot from "../plugins/v2exHot/Component"
import WeiboHot from "../plugins/weiboHot/Component"
import XueqiuLive from "../plugins/xueqiuLive/Component"
import ProducthuntRank from "../plugins/producthuntRank/Component"
import IndiehackerExplore from "../plugins/indiehackerExplore/Component"

export default function Index() {
  return (
    <Grid>
      <WeiboHot />
      <XueqiuLive />
      <V2exHot />
      <JikeDaily />
      <GithubTrending />
      <OschinaHot />
      <ProducthuntRank />
      <IndiehackerExplore />
    </Grid>
  )
}
