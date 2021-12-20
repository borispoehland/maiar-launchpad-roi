import { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { RiFileCopyLine, RiCheckFill } from 'react-icons/ri'

interface IProps {}

const WALLET_ADDRESS = '0xb5ecE9318223BE6F04840BDCe1184BA9Ab769ECd'

const Intro = (): JSX.Element => {
    const [hasCopiedWalletAddress, setHasCopiedWalletAddress] = useState(false)

    return (
        <>
            <p className="text-gray-300 mb-2">
                Hi, my name is Boris and I made this tool so you can track the
                Return on Investment (ROI) of all Seedify IGOs. If you like my
                work, you can tip me below or{' '}
                <a href="https://borispoehland.com" target="__blank">
                    hire me
                </a>{' '}
                for your next project!
            </p>
            <p className="text-gray-300">My ETH / BSC / Polygon address:</p>
            <div className="flex xl:block 2xl:flex gap-2 items-center">
                <pre
                    className="whitespace-pre-wrap"
                    style={{ wordWrap: 'anywhere' }}
                >
                    {WALLET_ADDRESS}
                </pre>
                <CopyToClipboard
                    text={WALLET_ADDRESS}
                    onCopy={() => setHasCopiedWalletAddress(true)}
                >
                    {hasCopiedWalletAddress ? (
                        <RiCheckFill
                            size={20}
                            className="cursor-pointer text-h-green"
                        />
                    ) : (
                        <RiFileCopyLine
                            size={20}
                            className="cursor-pointer text-h-green"
                        />
                    )}
                </CopyToClipboard>
            </div>
        </>
    )
}

export default Intro
