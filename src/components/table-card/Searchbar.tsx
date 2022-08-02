import { Dispatch, SetStateAction } from 'react'
import { BiSearchAlt } from 'react-icons/bi'

interface IProps {
    state: string
    setState: Dispatch<SetStateAction<string>>
}

const Searchbar = ({ setState, state }: IProps): JSX.Element => {
    return (
        <div className="form-control max-w-xs">
            <label className="label pb-1 pt-0">
                <span className="label-text">Search coins</span>
            </label>
            <div className="relative text-gray-600">
                <input
                    className="input input-bordered input-success bg-white h-10 px-5 pr-8 rounded text-sm focus:outline-none"
                    type="search"
                    name="search"
                    placeholder={'e.g. "holoride"'}
                    value={state}
                    onChange={(e) =>
                        setState(e.target.value.trim().toLowerCase())
                    }
                />
                <button
                    type="submit"
                    className="absolute right-0 mr-4 top-1/2 transform -translate-y-1/2"
                >
                    <BiSearchAlt />
                </button>
            </div>
        </div>
    )
}

export default Searchbar
