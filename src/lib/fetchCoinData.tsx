import axios from 'axios'
import coins from '../data/coins.json'
import { getFakeCoinData, getFakeCoinMeta } from './getFakeResponse'

interface CoinMarketData {
    slug: string
    currentPrice?: number
    athPrice?: number
}

interface CoinMetaData {
    name: string
    ticker: string
    idoPrice: number
    slug: string
    logoUrl: string
    explorerUrl: string
    chain: string
    contractAddress: string
}

export interface CoinData extends CoinMarketData, CoinMetaData {}

const fetchCoinMarketData = async (): Promise<CoinMarketData[] | undefined> => {
    let response
    const headers = {
        'X-CMC_PRO_API_KEY': String(process.env.CMC_API_KEY),
        accept: 'application/json',
    }
    const params = {
        slug: Object.keys(coins).join(','),
        skip_invalid: true,
    }
    try {
        if ((process.env.APP_ENV ?? process.env.NODE_ENV) === 'development') {
            response = getFakeCoinData()
        } else
            response = await axios.get(
                'https://pro-api.coinmarketcap.com/v1/cryptocurrency/price-performance-stats/latest',
                {
                    params,
                    headers,
                }
            )

        return Object.values(response.data.data).map(
            (coinData: any): CoinMarketData => {
                return {
                    slug: coinData.slug,
                    currentPrice: coinData.periods.all_time.quote.USD.close,
                    athPrice: coinData.periods.all_time.quote.USD.high,
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

const fetchCoinMetaData = async (): Promise<CoinMetaData[] | undefined> => {
    let response
    const headers = {
        'X-CMC_PRO_API_KEY': String(process.env.CMC_API_KEY),
        accept: 'application/json',
    }
    const params = {
        slug: Object.keys(coins).join(','),
    }
    try {
        if ((process.env.APP_ENV ?? process.env.NODE_ENV) === 'development') {
            response = getFakeCoinMeta()
        } else
            response = await axios.get(
                'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
                {
                    params,
                    headers,
                }
            )

        return Object.values(response.data.data).map(
            (coinMeta: any): CoinMetaData => {
                return {
                    slug: coinMeta.slug,
                    name: coinMeta.name,
                    idoPrice: coins[coinMeta.slug as keyof typeof coins],
                    ticker: coinMeta.symbol,
                    chain: coinMeta?.platform?.slug ?? null,
                    contractAddress: coinMeta?.platform?.token_address ?? null,
                    explorerUrl: coinMeta.urls?.explorer?.[0] ?? null,
                    logoUrl: coinMeta.logo ?? null,
                }
            }
        )
    } catch (error) {
        console.error(error)
    }
}

/*
    Merges meta data and market data
*/
export const fetchCoinData = async (): Promise<CoinData[] | undefined> => {
    const meta = await fetchCoinMetaData()
    const data = await fetchCoinMarketData()

    return meta?.map((t1) => ({
        ...t1,
        ...data?.find((t2) => t2.slug === t1.slug),
    }))
}
