interface IProps {
    label: string
    value: string
}

const Metric = ({ label, value }: IProps): JSX.Element => {
    return (
        <div className="flex items-center gap-2 md:block">
            <h2 className="text-2xl bold">
                {label}
                <span className="md:hidden">:</span>
            </h2>
            <p className="text-2xl bold text-h-green">{value}</p>
        </div>
    )
}

export default Metric
