import type { GetStaticProps } from 'next'
import Image from 'next/image'
import Intro from '../src/components/intro-card/Intro'
import Card from '../src/components/Card'
import Table from '../src/components/table-card/Table'
import { CoinData, fetchCoinData } from '../src/lib/fetchCoinData'
import Searchbar from '../src/components/table-card/Searchbar'
import { useState } from 'react'
import SortDropdown from '../src/components/table-card/SortDropdown'
import { ISortFilter, sortFilters } from '../src/data/sortFilters'
import PoweredBy from '../src/components/table-card/PoweredBy'
import Metric from '../src/components/intro-card/Metric'

export interface IFetchedData {
    coinData: CoinData[] | null
    currentAvgRoi: number
    athAvgRoi: number
    igosCount: number
}

interface IProps extends IFetchedData {}

const Home = ({ coinData, currentAvgRoi, athAvgRoi, igosCount }: IProps) => {
    const [searchValue, setSearchValue] = useState('')
    const [sortFilter, setSortFilter] = useState<ISortFilter>(
        sortFilters.newest
    )

    if (!coinData)
        return (
            <Card className="text-center">
                <span className="text-red-500">Error</span> fetching the data.
                Please{' '}
                <a href="https://t.me/boris0crypto" target="__blank">
                    contact the developer
                </a>{' '}
                of this tool. Thanks!
            </Card>
        )

    const filteredData = coinData.filter((item) => {
        return (
            item.ticker.toLowerCase().includes(searchValue) ||
            item.name.toLowerCase().includes(searchValue)
        )
    })

    const filteredAndSortedData = sortFilter.function(filteredData)

    return (
        <div className="flex flex-col gap-4 md:gap-8 mt-4 md:mt-8 max-w-[100rem] mx-auto">
            <Card>
                <div className="flex gap-2 items-center mb-4">
                    <Image
                        src="/img/seedify_logo.jpg"
                        width="50"
                        height="50"
                        className="rounded-full"
                        alt="Seedify Logo"
                    />
                    <h1 className="text-3xl md:text-4xl">
                        Seedify ROI Tracker
                    </h1>
                </div>
                <div className="grid items-end xl:grid-cols-3 gap-6 xl:gap-0">
                    <div className="xl:col-span-2 grid md:grid-cols-3 md:justify-items-center xl:justify-items-start">
                        <Metric
                            label="Current AVG ROI"
                            value={`${currentAvgRoi?.toFixed(2)}x`}
                        />
                        <Metric
                            label="ATH AVG ROI"
                            value={`${athAvgRoi?.toFixed(2)}x`}
                        />
                        <Metric
                            label="IGOs held"
                            value={igosCount.toString()}
                        />
                    </div>
                    <div className="xl:col-span-1 overflow-hidden">
                        <Intro />
                    </div>
                </div>
            </Card>
            <Card className="overflow-x-auto">
                <div className="flex flex-col gap-3 items-start sm:flex-row sm:justify-end sm:items-center pb-4">
                    <Searchbar setState={setSearchValue} state={searchValue} />
                    <SortDropdown state={sortFilter} setState={setSortFilter} />
                </div>
                <Table
                    data={filteredAndSortedData}
                    setSearchValue={setSearchValue}
                />
                <PoweredBy />
            </Card>
        </div>
    )
}

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
    const coinData = await fetchCoinData()

    const getAvgRoi = (
        property: keyof CoinData,
        coinData: CoinData[] | undefined
    ): number => {
        return (
            (coinData?.reduce((acc, curr) => {
                if (curr[property]) {
                    return acc + (curr[property] as number) / curr.idoPrice
                }
                return acc
            }, 0) as number) /
            (coinData?.filter((igo) => igo[property]) as CoinData[])?.length
        )
    }

    return {
        props: {
            coinData: coinData ?? null,
            currentAvgRoi: getAvgRoi('currentPrice', coinData),
            athAvgRoi: getAvgRoi('athPrice', coinData),
            igosCount: coinData?.length ?? 0,
        },
        revalidate: 60,
    }
}

export default Home
