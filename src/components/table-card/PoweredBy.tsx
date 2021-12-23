import Image from 'next/image'

const PoweredBy = (): JSX.Element => {
    return (
        <div className="flex flex-col sm:flex-row sm:gap-2 justify-center items-center pt-4">
            Data powered by{' '}
            <div className="flex gap-2 items-center">
                <Image
                    src="/img/coinmarketcap_logo.png"
                    width={30}
                    height={30}
                    layout="fixed"
                    className="rounded-full"
                    alt="Coinmarketcap Logo"
                />{' '}
                Coinmarketcap API
            </div>
        </div>
    )
}

export default PoweredBy
