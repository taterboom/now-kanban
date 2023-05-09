import { decode } from "iconv-lite"

const calcFixedPriceNumber = (
  open: string,
  yestclose: string,
  price: string,
  high: string,
  low: string
): number => {
  let reg = /0+$/g
  open = open.replace(reg, "")
  yestclose = yestclose.replace(reg, "")
  price = price.replace(reg, "")
  high = high.replace(reg, "")
  low = low.replace(reg, "")
  let o = open.indexOf(".") === -1 ? 0 : open.length - open.indexOf(".") - 1
  let yc = yestclose.indexOf(".") === -1 ? 0 : yestclose.length - yestclose.indexOf(".") - 1
  let p = price.indexOf(".") === -1 ? 0 : price.length - price.indexOf(".") - 1
  let h = high.indexOf(".") === -1 ? 0 : high.length - high.indexOf(".") - 1
  let l = low.indexOf(".") === -1 ? 0 : low.length - low.indexOf(".") - 1
  let max = Math.max(o, yc, p, h, l)
  if (max > 3) {
    max = 2 // 接口返回的指数数值的小数位为4，但习惯两位小数
  }
  return max
}

const formatNumber = (val: string | number = 0, fixed: number = 2, format = true): string => {
  const num = +val
  if (format) {
    if (num > 1000 * 10000) {
      return (num / (10000 * 10000)).toFixed(fixed) + "亿"
    } else if (num > 1000) {
      return (num / 10000).toFixed(fixed) + "万"
    }
  }
  return `${num.toFixed(fixed)}`
}

const randHeader = () => {
  const head_connection = ["Keep-Alive", "close"]
  const head_accept = ["text/html, application/xhtml+xml, */*"]
  const head_accept_language = [
    "zh-CN,fr-FR;q=0.5",
    "en-US,en;q=0.8,zh-Hans-CN;q=0.5,zh-Hans;q=0.3",
  ]
  const head_user_agent = [
    "Opera/8.0 (Macintosh; PPC Mac OS X; U; en)",
    "Opera/9.27 (Windows NT 5.2; U; zh-cn)",
    "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Win64; x64; Trident/4.0)",
    "Mozilla/4.0 (compatible; MSIE 8.0; Windows NT 6.1; Trident/4.0)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; InfoPath.2; .NET4.0C; .NET4.0E; QQBrowser/7.3.9825.400)",
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; WOW64; Trident/6.0; BIDUBrowser 2.x)",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070309 Firefox/2.0.0.3",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1) Gecko/20070803 Firefox/1.5.0.12",
    "Mozilla/5.0 (Windows; U; Windows NT 5.2) Gecko/2008070208 Firefox/3.0.1",
    "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.8.1.12) Gecko/20080219 Firefox/2.0.0.12 Navigator/9.0.0.6",
    "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; Media Center PC 6.0; .NET4.0C; rv:11.0) like Gecko)",
    "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:21.0) Gecko/20100101 Firefox/21.0 ",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Maxthon/4.0.6.2000 Chrome/26.0.1410.43 Safari/537.1 ",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.1 (KHTML, like Gecko) Chrome/21.0.1180.92 Safari/537.1 LBBROWSER",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/55.0.2883.75 Safari/537.36",
    "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.11 TaoBrowser/3.0 Safari/536.11",
    "Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko",
    "Mozilla/5.0 (Macintosh; PPC Mac OS X; U; en) Opera 8.0",
  ]
  const result = {
    Connection: head_connection[0],
    Accept: head_accept[0],
    "Accept-Language": head_accept_language[1],
    "User-Agent": head_user_agent[Math.floor(Math.random() * 10)],
  }
  return result
}

type LeekTreeItem = {
  code: string
  name: string
  price: number
  high: number
  low: number
  open: number
}

const globalState: Record<string, any> = {}

// throw error in 10 seconds
const timeout = (ms = 10000): Promise<never> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error("timeout"))
    }, ms)
  })
}

// retry when failed
const retry = <K, T extends () => Promise<K>>(fn: T, times = 3, delay = 1000) => {
  return new Promise<K>((resolve, reject) => {
    const attempt = () => {
      fn()
        .then(resolve)
        .catch((error: Error) => {
          times--
          if (times === 0) {
            reject(error)
          } else {
            setTimeout(() => {
              attempt()
            }, delay)
          }
        })
    }
    attempt()
  })
}

async function _getStockData(codes: Array<string>): Promise<Array<LeekTreeItem>> {
  if ((codes && codes.length === 0) || !codes) {
    return []
  }

  let aStockCount = 0
  let usStockCount = 0
  let cnfStockCount = 0
  let hfStockCount = 0
  let noDataStockCount = 0
  let stockList: Array<LeekTreeItem> = []

  const url = `https://hq.sinajs.cn/list=${codes.join(",")}`
  try {
    const resp = await fetch(url, {
      headers: {
        ...randHeader(),
        Referer: "http://finance.sina.com.cn/",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("failed")
        }
        return res.arrayBuffer()
      })
      .then((buf) => decode(Buffer.from(buf), "GB18030"))
    // const resp = await Axios.get(url, {
    //   // axios 乱码解决
    //   responseType: "arraybuffer",
    //   transformResponse: [
    //     (data) => {
    //       const body = decode(data, "GB18030")
    //       return body
    //     },
    //   ],
    //   headers: {
    //     ...randHeader(),
    //     Referer: "http://finance.sina.com.cn/",
    //   },
    // })
    if (/FAILED/.test(resp)) {
      if (codes.length === 1) {
        console.error(`fail: error Stock code in ${codes}, please delete error Stock code.`)
        return []
      }
      for (const code of codes) {
        stockList = stockList.concat(await _getStockData(new Array(code)))
      }
    } else {
      const splitData = resp.split(";\n")
      for (let i = 0; i < splitData.length - 1; i++) {
        const code = splitData[i].split('="')[0].split("var hq_str_")[1]
        const params = splitData[i].split('="')[1].split(",")
        let type = code.substr(0, 2) || "sh"
        let symbol = code.substr(2)
        let stockItem: any
        let fixedNumber = 2
        if (params.length > 1) {
          if (/^(sh|sz)/.test(code)) {
            let open = params[1]
            let yestclose = params[2]
            let price = params[3]
            let high = params[4]
            let low = params[5]
            fixedNumber = calcFixedPriceNumber(open, yestclose, price, high, low)
            stockItem = {
              code,
              name: params[0],
              open: formatNumber(open, fixedNumber, false),
              yestclose: formatNumber(yestclose, fixedNumber, false),
              price: formatNumber(price, fixedNumber, false),
              low: formatNumber(low, fixedNumber, false),
              high: formatNumber(high, fixedNumber, false),
              volume: formatNumber(params[8], 2),
              amount: formatNumber(params[9], 2),
              time: `${params[30]} ${params[31]}`,
              percent: "",
            }
            aStockCount += 1
          } else if (/^gb_/.test(code)) {
            symbol = code.substr(3)
            let open = params[5]
            let yestclose = params[26]
            let price = params[1]
            let high = params[6]
            let low = params[7]
            fixedNumber = calcFixedPriceNumber(open, yestclose, price, high, low)
            stockItem = {
              code,
              name: params[0],
              open: formatNumber(open, fixedNumber, false),
              yestclose: formatNumber(yestclose, fixedNumber, false),
              price: formatNumber(price, fixedNumber, false),
              low: formatNumber(low, fixedNumber, false),
              high: formatNumber(high, fixedNumber, false),
              volume: formatNumber(params[10], 2),
              amount: "接口无数据",
              percent: "",
            }
            type = code.substr(0, 3)
            noDataStockCount += 1
          } else if (/^usr_/.test(code)) {
            symbol = code.substr(4)
            let open = params[5]
            let yestclose = params[26]
            let price = params[1]
            let high = params[6]
            let low = params[7]
            fixedNumber = calcFixedPriceNumber(open, yestclose, price, high, low)
            stockItem = {
              code,
              name: params[0],
              open: formatNumber(open, fixedNumber, false),
              yestclose: formatNumber(yestclose, fixedNumber, false),
              price: formatNumber(price, fixedNumber, false),
              low: formatNumber(low, fixedNumber, false),
              high: formatNumber(high, fixedNumber, false),
              volume: formatNumber(params[10], 2),
              amount: "接口无数据",
              percent: "",
            }
            type = code.substr(0, 4)
            usStockCount += 1
          } else if (/nf_/.test(code)) {
            /* 解析格式，与股票略有不同
              var hq_str_V2201="PVC2201,230000,
              8585.00, 8692.00, 8467.00, 8641.00, // params[2,3,4,5] 开，高，低，昨收
              8673.00, 8674.00, // params[6, 7] 买一、卖一价
              8675.00, // 现价 params[8]
              8630.00, // 均价
              8821.00, // 昨日结算价【一般软件的行情涨跌幅按这个价格显示涨跌幅】（后续考虑配置项，设置按收盘价还是结算价显示涨跌幅）
              109, // 买一量
              2, // 卖一量
              289274, // 持仓量
              230643, //总量
              连, // params[8 + 7] 交易所名称 ["连","沪", "郑"]
              PVC,2021-11-26,1,9243.000,8611.000,9243.000,8251.000,9435.000,8108.000,13380.000,8108.000,445.541";
              */
            let name = params[0]
            let open = params[2]
            let high = params[3]
            let low = params[4]
            let yestclose = params[5]
            let price = params[8]
            let yestCallPrice = params[8 + 2]
            let volume = params[8 + 6] // 成交量
            //股指期货
            const stockIndexFuture =
              /nf_IC/.test(code) ||
              /nf_IF/.test(code) ||
              /nf_IH/.test(code) ||
              /nf_TF/.test(code) || // 五债
              /nf_TS/.test(code) || // 二债
              /nf_T\d+/.test(code) // 十债
            if (stockIndexFuture) {
              // 0 开盘       1 最高      2  最低     3 收盘
              // ['5372.000', '5585.000', '5343.000', '5581.600',
              // 4 成交量                 6 持仓量
              // '47855', '261716510.000', '124729.000', '5581.600',
              // '0.000', '5849.800', '4786.200', '0.000', '0.000',
              //  13 昨收盘   14 昨天结算
              // '5342.800', '5318.000', '126776.000', '5581.600',
              // '4', '0.000', '0', '0.000', '0', '0.000', '0', '0.000', '0', '5582.000', '2', '0.000', '0', '0.000', '0', '0.000', '0', '0.000', '0', '2022-04-29', '15:00:00', '300', '0', '', '', '', '', '', '', '', '',
              // 48        49  名称
              // '5468.948', '中证500指数期货2206"']

              name = params[49].slice(0, -1) // 最后一位去掉 "
              open = params[0]
              high = params[1]
              low = params[2]
              price = params[3]
              volume = params[4]
              yestclose = params[13]
              yestCallPrice = params[14]
            }
            fixedNumber = calcFixedPriceNumber(open, yestclose, price, high, low)
            stockItem = {
              code: code,
              name: name,
              open: formatNumber(open, fixedNumber, false),
              yestclose: formatNumber(yestclose, fixedNumber, false),
              yestcallprice: formatNumber(yestCallPrice, fixedNumber, false),
              price: formatNumber(price, fixedNumber, false),
              low: formatNumber(low, fixedNumber, false),
              high: formatNumber(high, fixedNumber, false),
              volume: formatNumber(volume, 2),
              amount: "接口无数据",
              percent: "",
            }
            type = "nf_"
            cnfStockCount += 1
          } else if (/hf_/.test(code)) {
            // 海外期货格式
            // 0 当前价格
            // ['105.306', '',
            //  2  买一价  3 卖一价  4  最高价   5 最低价
            // '105.270', '105.290', '105.540', '102.950',
            //  6 时间   7 昨日结算价  8 开盘价  9 持仓量
            // '15:51:34', '102.410', '103.500', '250168.000',
            // 10 买 11 卖 12 日期      13 名称  14 成交量
            // '5', '2', '2022-05-04', 'WTI纽约原油2206', '28346"']
            // 当前价格
            let price = params[0]
            // 名称
            let name = params[13]
            let open = params[8]
            let high = params[4]
            let low = params[5]
            let yestclose = params[7] // 昨收盘
            let yestCallPrice = params[7] // 昨结算
            let volume = params[14].slice(0, -1) // 成交量。slice 去掉最后一位 "
            fixedNumber = calcFixedPriceNumber(open, yestclose, price, high, low)

            stockItem = {
              code: code,
              name: name,
              open: formatNumber(open, fixedNumber, false),
              yestclose: formatNumber(yestclose, fixedNumber, false),
              yestcallprice: formatNumber(yestCallPrice, fixedNumber, false),
              price: formatNumber(price, fixedNumber, false),
              low: formatNumber(low, fixedNumber, false),
              high: formatNumber(high, fixedNumber, false),
              volume: formatNumber(volume, 2),
              amount: "接口无数据",
              percent: "",
            }
            type = "hf_"
            hfStockCount += 1
          }
          if (stockItem) {
            const { yestclose, open } = stockItem
            let { price } = stockItem
            /*  if (open === price && price === '0.00') {
              stockItem.isStop = true;
            } */

            // 竞价阶段部分开盘和价格为0.00导致显示 -100%
            try {
              if (Number(open) <= 0) {
                price = yestclose
              }
            } catch (err) {
              console.error(err)
            }
            stockItem.showLabel = "this.showLabel"
            stockItem.isStock = true
            stockItem.type = type
            stockItem.symbol = symbol
            stockItem.updown = formatNumber(+price - +yestclose, fixedNumber, false)
            stockItem.percent =
              (stockItem.updown >= 0 ? "+" : "-") +
              formatNumber((Math.abs(stockItem.updown) / +yestclose) * 100, 2, false)

            const treeItem = stockItem
            stockList.push(treeItem)
          }
        } else {
          // 接口不支持的
          noDataStockCount += 1
          stockItem = {
            id: code,
            name: `接口不支持该股票 ${code}`,
            showLabel: "this.showLabel",
            isStock: true,
            percent: "",
            type: "nodata",
            contextValue: "nodata",
          }
          const treeItem = stockItem
          stockList.push(treeItem)
        }
      }
    }
  } catch (err) {
    console.error(err)
  }

  globalState.aStockCount = aStockCount
  globalState.usStockCount = usStockCount
  globalState.cnfStockCount = cnfStockCount
  globalState.hfStockCount = hfStockCount
  globalState.noDataStockCount = noDataStockCount

  return stockList
}

export const getStockData: typeof _getStockData = (...args) =>
  retry(() => Promise.race([_getStockData(...args), timeout()]))
