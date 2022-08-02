import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextSeo
                title="Maiar Launchpad ROI Tracker"
                description="Track the ROI of Maiar Launchpad IDOs"
                openGraph={{
                    url: 'https://maiar-launchpad-roi.vercel.app/',
                    title: 'Maiar Launchpad ROI Tracker',
                    description: 'Track the ROI of Maiar Launchpad IDOs',
                }}
                twitter={{
                    handle: '@boris0crypto',
                    site: '@boris0crypto',
                    cardType: 'summary_large_image',
                }}
            />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp
