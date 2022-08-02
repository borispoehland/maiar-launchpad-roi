interface IExplorer {
    logoPathName: string
    explorerUrl: string
}

export const getExplorers = (
    contractAddress: string
): { [key: string]: IExplorer } => {
    return {
        ethereum: {
            logoPathName: 'etherscan_logo.webp',
            explorerUrl: `https://etherscan.io/token/${contractAddress}`,
        },
        polygon: {
            logoPathName: 'polygonscan_logo.webp',
            explorerUrl: `https://polygonscan.com/token/${contractAddress}`,
        },
        bnb: {
            logoPathName: 'bscscan_logo.webp',
            explorerUrl: `https://bscscan.com/token/${contractAddress}`,
        },
        solana: {
            logoPathName: 'solscan_logo.png',
            explorerUrl: `https://solscan.io/token/${contractAddress}`,
        },
        avalanche: {
            logoPathName: 'snowtrace_logo.png',
            explorerUrl: `https://snowtrace.io/token/${contractAddress}`,
        },
        fantom: {
            logoPathName: 'ftmscan_logo.png',
            explorerUrl: `https://ftmscan.com/token/${contractAddress}`,
        },
        'elrond-egld': {
            logoPathName: 'elrondexplorer_logo.png',
            explorerUrl: `https://explorer.elrond.com/tokens/${contractAddress}`,
        },
    }
}
