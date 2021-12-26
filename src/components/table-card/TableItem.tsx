import cx from 'classnames'
import Image from 'next/image'
import { getExplorers } from '../../data/explorers'
import { CoinData } from '../../lib/fetchCoinData'

interface IProps extends CoinData {
    isOdd: boolean
}

const CMC_BASE_URL = 'https://coinmarketcap.com/currencies/'

const trimNumber = (num: number): string => {
    const trailingZeros = -Math.floor(Math.log(num) / Math.log(10) + 1)
    return num.toFixed(trailingZeros > 0 ? trailingZeros + 2 : 2)
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
    chain,
    contractAddress,
}: IProps): JSX.Element => {
    const explorerInfo = getExplorers(contractAddress)[chain]

    return (
        <tr key={slug} className={cx({ 'bg-slate-600': isOdd })}>
            <td
                className={cx({
                    'bg-slate-600': isOdd,
                    'bg-slate-700': !isOdd,
                })}
            >
                <div className="flex gap-2 items-center">
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
                    <a
                        href={`${CMC_BASE_URL}/${slug}`}
                        target="_blank"
                        className="flex"
                        rel="noreferrer"
                    >
                        <span className="hidden lg:block flex-shrink-0">
                            {name} (
                        </span>
                        {ticker}
                        <span className="hidden lg:block">)</span>
                    </a>
                </div>
            </td>
            <td>${idoPrice}</td>
            <td>{currentPrice ? '$' + trimNumber(currentPrice) : '-'}</td>
            <td className="font-bold">
                {currentPrice
                    ? (currentPrice / idoPrice).toFixed(2) + 'x'
                    : '-'}
            </td>
            <td>{athPrice ? '$' + trimNumber(athPrice) : '-'}</td>
            <td className="font-bold">
                {athPrice ? (athPrice / idoPrice).toFixed(2) + 'x' : '-'}
            </td>
            <td className="flex gap-2">
                <a
                    href={`${CMC_BASE_URL}/${slug}`}
                    target="_blank"
                    className="flex-shrink-0 flex"
                    rel="noreferrer"
                >
                    <Image
                        src="/img/coinmarketcap_logo.png"
                        width={20}
                        height={20}
                        className="rounded-full"
                        alt={`Go to the Coinmarketcap page of ${name}`}
                    />
                </a>
                {explorerInfo && (
                    <a
                        href={explorerInfo.explorerUrl}
                        target="_blank"
                        className="flex-shrink-0 flex"
                        rel="noreferrer"
                    >
                        <Image
                            src={`/img/explorer-logos/${explorerInfo.logoPathName}`}
                            width={20}
                            height={20}
                            className="rounded-full"
                            alt={`Go to the explorer page of ${name}`}
                        />
                    </a>
                )}
            </td>
        </tr>
    )
}

export default TableItem
