import { Dispatch, SetStateAction } from 'react'
import { CoinData } from '../../lib/fetchCoinData'
import TableItem from './TableItem'

interface IProps {
    data: CoinData[]
    setSearchValue: Dispatch<SetStateAction<string>>
}

const Table = ({ data, setSearchValue }: IProps): JSX.Element => {
    return data.length ? (
        <div className="overflow-x-auto w-full">
            <table className="w-full relative">
                <thead>
                    <tr className="text-left whitespace-nowrap">
                        <th className="bg-slate-700">Name</th>
                        <th>IGO price</th>
                        <th>Current price</th>
                        <th>Current ROI</th>
                        <th>ATH price</th>
                        <th>ATH ROI</th>
                        <th>Links</th>
                    </tr>
                </thead>
                <tbody>
                    {data
                        .map((item, idx) => ({
                            ...item,
                            isOdd: Boolean(idx & 1),
                        }))
                        .map(TableItem)}
                </tbody>
            </table>
        </div>
    ) : (
        <div className="flex flex-col items-center">
            <span className="text-red-500">
                No results for your current search filter.
            </span>
            <a href="#" onClick={() => setSearchValue('')}>
                Clear search filter
            </a>
        </div>
    )
}

export default Table
