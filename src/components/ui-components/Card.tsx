import { PropsWithChildren } from 'react'
import cx from 'classnames'

interface IProps {
    className?: string
}

const Card = ({
    children,
    className,
}: PropsWithChildren<IProps>): JSX.Element => {
    return (
        <section className={cx('bg-slate-700 rounded shadow p-4', className)}>
            {children}
        </section>
    )
}

export default Card
