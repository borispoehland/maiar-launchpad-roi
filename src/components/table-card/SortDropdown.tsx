import { Dispatch, SetStateAction } from 'react'
import {
    findFilterKeyByValue,
    ISortFilter,
    sortFilters,
} from '../../data/sortFilters'

interface IProps {
    state: ISortFilter
    setState: Dispatch<SetStateAction<ISortFilter>>
}

const SortDropdown = ({ state, setState }: IProps): JSX.Element => {
    return (
        <div className="form-control max-w-xs">
            <label className="label pb-1 pt-0">
                <span className="label-text">Sort by...</span>
            </label>
            <select
                className="select select-bordered select-success bg-white text-gray-600 h-10 min-h-0 rounded"
                value={findFilterKeyByValue(state)}
                onChange={(e) => {
                    const { value } = e.target
                    setState(sortFilters[value])
                }}
            >
                {Object.keys(sortFilters).map((key) => {
                    const label = sortFilters[key].label
                    return (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}

export default SortDropdown
