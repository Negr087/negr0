import { NextResponse } from "next/server"

// --- Helpers -----------------------------
const UA = "negr0-landing/1.0 (+https://your-domain.com)"

async function fetchJsonSafe<T = any>(url: string) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      next: { revalidate: 60 }, // cache 1 min server-side
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const ct = res.headers.get("content-type") ?? ""
    if (!ct.includes("application/json")) throw new Error(`Bad CT ${ct}`)
    return (await res.json()) as T
  } catch (err) {
    console.error("fetchJsonSafe error", url, err)
    return null
  }
}

// --- Price in USD ------------------------
async function getPriceUSD() {
  /* 1)  Blockchain.info (stable, no key) */
  const bc = await fetchJsonSafe<Record<"USD", { last: number }>>("https://blockchain.info/ticker")
  if (bc?.USD?.last) return bc.USD.last

  /* 2)  CoinPaprika fallback */
  const cp = await fetchJsonSafe<{ quotes: { USD: { price: number } } }>(
    "https://api.coinpaprika.com/v1/tickers/btc-bitcoin",
  )
  if (cp?.quotes?.USD?.price) return cp.quotes.USD.price

  /* 3)  CoinGecko (rate-limited) final fallback */
  const cg = await fetchJsonSafe<Record<"bitcoin", { usd: number }>>(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd",
  )
  if (cg?.bitcoin?.usd) return cg.bitcoin.usd

  return null
}

async function getBlockHeight() {
  try {
    const res = await fetch("https://blockstream.info/api/blocks/tip/height", {
      headers: { "User-Agent": UA },
      next: { revalidate: 30 },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const n = Number.parseInt(await res.text(), 10)
    return Number.isFinite(n) && n > 0 ? n : null
  } catch (err) {
    console.error("blockHeight fetch error", err)
    return null
  }
}

export async function GET() {
  const [price, blockHeight] = await Promise.all([getPriceUSD(), getBlockHeight()])

  return NextResponse.json({
    price: price ?? null,
    blockHeight: blockHeight ?? null,
  })
}
