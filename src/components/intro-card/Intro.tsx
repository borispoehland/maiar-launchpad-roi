import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { RiFileCopyLine, RiCheckFill } from 'react-icons/ri'

const WALLET_ADDRESS =
    'erd1y6jslrt584hwxczk2hvrezs4pet87936ttqhzx63lmzwsg8gmw2srqxv47'

const Intro = (): JSX.Element => {
    const [hasCopiedWalletAddress, setHasCopiedWalletAddress] = useState(false)

    return (
        <>
            <p className="text-gray-300 mb-2">
                Hi, my name is Boris Pöhland and I made this tool so you can
                track the Return on Investment (ROI) of all Maiar Launchpad
                IDOs. If you like my work, you can tip me below or{' '}
                <a href="https://borispoehland.com" target="__blank">
                    hire me
                </a>{' '}
                for your next project!
            </p>
            <p className="text-gray-300">My ERD address:</p>
            <div className="flex xl:block 2xl:flex gap-2 items-center">
                <pre className="overflow-x-auto">{WALLET_ADDRESS}</pre>
                <CopyToClipboard
                    text={WALLET_ADDRESS}
                    onCopy={() => setHasCopiedWalletAddress(true)}
                >
                    {hasCopiedWalletAddress ? (
                        <RiCheckFill
                            size={20}
                            className="cursor-pointer text-h-green flex-shrink-0"
                        />
                    ) : (
                        <RiFileCopyLine
                            size={20}
                            className="cursor-pointer text-h-green flex-shrink-0"
                        />
                    )}
                </CopyToClipboard>
            </div>
        </>
    )
}

export default Intro
