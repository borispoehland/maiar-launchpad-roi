import coins from '../data/coins.json'
import { CoinData } from '../lib/fetchCoinData'

type SortFunction = (items: CoinData[]) => CoinData[]

export interface ISortFilter {
    label: string
    function: SortFunction
}

/*
    Some coins have no market data. Hence this function takes care of this, by appending them to the end if the filter uses market data
*/
const sortWithMarketData = (
    items: CoinData[],
    sortFunction: (a: Required<CoinData>, b: Required<CoinData>) => number
) => {
    return (
        items
            .filter((coin) => coin.currentPrice)
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            .sort(sortFunction)
            .concat(items.filter((coin) => !coin.currentPrice))
    )
}

const igosSortedByDate = Object.keys(coins)

export const sortFilters: { [key: string]: ISortFilter } = {
    newest: {
        label: 'Most recent',
        function: (items: CoinData[]) =>
            items.sort(
                (a, b) =>
                    igosSortedByDate.indexOf(a.slug) -
                    igosSortedByDate.indexOf(b.slug)
            ),
    },
    athRoiDesc: {
        label: 'Highest ATH ROI',
        function: (items: CoinData[]) =>
            sortWithMarketData(
                items,
                (a, b) => b.athPrice / b.idoPrice - a.athPrice / a.idoPrice
            ),
    },
    athRoiAsc: {
        label: 'Lowest ATH ROI',
        function: (items: CoinData[]) =>
            sortWithMarketData(
                items,
                (a, b) => a.athPrice / a.idoPrice - b.athPrice / b.idoPrice
            ),
    },
    currentRoiDesc: {
        label: 'Highest current ROI',
        function: (items: CoinData[]) =>
            sortWithMarketData(
                items,
                (a, b) =>
                    b.currentPrice / b.idoPrice - a.currentPrice / a.idoPrice
            ),
    },
    currentRoiAsc: {
        label: 'Lowest current ROI',
        function: (items: CoinData[]) =>
            sortWithMarketData(
                items,
                (a, b) =>
                    a.currentPrice / a.idoPrice - b.currentPrice / b.idoPrice
            ),
    },
}

export const findFilterKeyByValue = (value: ISortFilter) => {
    return Object.keys(sortFilters).find((key) => sortFilters[key] === value)
}
