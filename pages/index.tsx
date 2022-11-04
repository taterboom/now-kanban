import JikeDaily from "../plugins/jikeDaily/Component"
import V2exHot from "../plugins/v2exHot/Component"
import WeiboHot from "../plugins/weiboHot/Component"
import XueqiuLive from "../plugins/xueqiuLive/Component"

export default function Index() {
  return (
    <div>
      <WeiboHot />
      <XueqiuLive />
      <V2exHot />
      <JikeDaily />
    </div>
  )
}
