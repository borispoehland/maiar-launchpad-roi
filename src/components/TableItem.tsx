import cx from 'classnames'
import Image from 'next/image'

export interface CoinData {
    slug: string
    currentPrice?: number
    athPrice?: number
}

export interface CoinMeta {
    name: string
    ticker: string
    idoPrice: number
    slug: string
    logoUrl: string
    explorerUrl: string
}

export interface Coin extends CoinData, CoinMeta {}

interface IProps extends Coin {
    isOdd: boolean
}

const TableItem = ({
    name,
    ticker,
    slug,
    isOdd,
    idoPrice,
    currentPrice,
    athPrice,
    logoUrl,
}: IProps): JSX.Element => {
    return (
        <tr key={slug} className={cx({ 'bg-slate-600': isOdd })}>
            <td className="flex gap-2 items-center">
                {logoUrl && (
                    <div className="flex-shrink-0 flex">
                        <Image
                            src={logoUrl}
                            width={20}
                            height={20}
                            layout="fixed"
                            className="rounded-full"
                            alt={`Logo of ${name}`}
                        />
                    </div>
                )}
                <div className="flex">
                    <span className="hidden lg:block flex-shrink-0">
                        {name} (
                    </span>
                    {ticker}
                    <span className="hidden lg:block">)</span>
                </div>
            </td>
            <td>${idoPrice}</td>
            <td>{currentPrice ? '$' + currentPrice?.toFixed(2) : '-'}</td>
            <td>
                {currentPrice
                    ? (currentPrice / idoPrice).toFixed(2) + 'x'
                    : '-'}
            </td>
            <td>{athPrice ? '$' + athPrice?.toFixed(2) : '-'}</td>
            <td>{athPrice ? (athPrice / idoPrice).toFixed(2) + 'x' : '-'}</td>
            <td></td>
        </tr>
    )
}

export default TableItem
