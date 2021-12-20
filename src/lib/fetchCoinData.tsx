import { CoinData, CoinMeta } from '../components/TableItem'
import axios from 'axios'
import coins from './coins.json'
import { getFakeCoinData, getFakeCoinMeta } from './getFakeResponse'

const parseSingleCoinData = (coinData: any): CoinData => {
    return {
        slug: coinData.slug,
        currentPrice: coinData.periods.all_time.quote.USD.close,
        athPrice: coinData.periods.all_time.quote.USD.high,
    }
}

const parseSingleCoinMeta = (coinMeta: any): CoinMeta => {
    return {
        slug: coinMeta.slug,
        name: coinMeta.name,
        idoPrice: coins[coinMeta.slug as keyof typeof coins],
        ticker: coinMeta.symbol,
        explorerUrl: coinMeta.urls?.explorer?.[0] ?? null,
        logoUrl: coinMeta.logo ?? null,
    }
}

export const fetchCoinData = async (): Promise<CoinData[] | undefined> => {
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
        if (process.env.NODE_ENV === 'development') {
            response = getFakeCoinData()
        } else
            response = await axios.get(
                'https://pro-api.coinmarketcap.com/v1/cryptocurrency/price-performance-stats/latest',
                {
                    params,
                    headers,
                }
            )

        return Object.values(response.data.data).map(parseSingleCoinData)
    } catch (error) {
        console.error(error)
    }
}

export const fetchCoinMeta = async (): Promise<CoinMeta[] | undefined> => {
    let response
    const headers = {
        'X-CMC_PRO_API_KEY': String(process.env.CMC_API_KEY),
        accept: 'application/json',
    }
    const params = {
        slug: Object.keys(coins).join(','),
    }
    try {
        if (process.env.NODE_ENV === 'development') {
            response = getFakeCoinMeta()
        } else
            response = await axios.get(
                'https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
                {
                    params,
                    headers,
                }
            )

        return Object.values(response.data.data).map(parseSingleCoinMeta)
    } catch (error) {
        console.error(error)
    }
}
