import TableItem, { Coin, CoinData } from './TableItem'

interface IProps {
    data: Coin[]
}

const Table = ({ data }: IProps): JSX.Element => {
    return (
        <div className="overflow-x-auto w-full">
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="text-left">Name</th>
                        <th className="text-left">IGO price</th>
                        <th className="text-left">Current price</th>
                        <th className="text-left">Current ROI</th>
                        <th className="text-left">ATH price</th>
                        <th className="text-left">ATH ROI</th>
                        <th className="text-left">Links</th>
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
    )
}

export default Table
