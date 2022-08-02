import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NextSeo } from 'next-seo'

const host = 'https://maiar-launchpad-roi.vercel.app'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <NextSeo
                title="Maiar Launchpad ROI Tracker"
                description="Track the ROI of Maiar Launchpad IDOs"
                openGraph={{
                    url: host,
                    title: 'Maiar Launchpad ROI Tracker',
                    description: 'Track the ROI of Maiar Launchpad IDOs',
                    images: [
                        {
                            url: `${host}/img/opengraph.png`,
                            width: 1200,
                            height: 630,
                            alt: 'Banner of the Maiar Launchpad ROI Tracker',
                        },
                    ],
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
