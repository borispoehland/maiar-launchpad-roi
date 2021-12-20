import type { GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Intro from '../src/components/Intro'
import Card from '../src/components/ui-components/Card'
import Metric from '../src/components/ui-components/Metric'
import Table from '../src/components/Table'
import { Coin, CoinData } from '../src/components/TableItem'
import { fetchCoinData, fetchCoinMeta } from '../src/lib/fetchCoinData'

interface IProps {
    data: Coin[] | undefined
}

const Home = ({ data }: IProps) => {
    return (
        <div className="flex flex-col gap-4 max-w-[100rem] mx-auto">
            <Card className="mt-2">
                <div className="flex gap-2 items-center mb-4">
                    <Image
                        src="/img/seedify_logo.jpg"
                        width="50"
                        height="50"
                        className="rounded-full"
                        alt="Seedify Logo"
                    />
                    <h1 className="text-4xl">Seedify ROI Tracker</h1>
                </div>
                <div className="grid items-end xl:grid-cols-3 gap-6 xl:gap-0">
                    <div className="xl:col-span-2 grid md:grid-cols-3 md:justify-items-center xl:justify-items-start">
                        <Metric label="Current AVG ROI" value="68.23x" />
                        <Metric label="ATH AVG ROI" value="50.54x" />
                        <Metric label="IGOs held" value="29" />
                    </div>
                    <div className="xl:col-span-1">
                        <Intro />
                    </div>
                </div>
            </Card>
            <Card className="overflow-x-auto">
                <Table data={data as Coin[]} />
            </Card>
        </div>
    )
}

export const getStaticProps: GetStaticProps<IProps> = async ({ params }) => {
    const meta = await fetchCoinMeta()
    const data = await fetchCoinData()

    const result = meta?.map((t1) => ({
        ...t1,
        ...data?.find((t2) => t2.slug === t1.slug),
    }))

    console.log(meta)

    return {
        props: {
            data: result,
        },
        revalidate: 60,
    }
}

export default Home
