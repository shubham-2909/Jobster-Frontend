import FormRow from './FormRow'
import FormRowSelect from './FormRowSelect'
import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/SearchContainer'
import { clearFilters, handleChange } from '../features/allJobs/allJobsSlice'
const SearchContainer = () => {
  const dispatch = useDispatch()
  const { isLoading, search, searchType, searchStatus, sort, sortOptions } =
    useSelector((store) => store.allJobs)
  const { jobTypeOptions, statusOptions } = useSelector((store) => store.job)

  const handleSearch = (e) => {
    // check for loading later
    const name = e.target.name
    const value = e.target.value
    dispatch(handleChange({ name, value }))
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(clearFilters())
  }
  return (
    <Wrapper>
      <h4>search form</h4>
      <div className='form-center'>
        {/* search text */}
        <FormRow
          name={`search`}
          type={`text`}
          value={search}
          onChange={handleSearch}
        />
        {/* search by status */}
        <FormRowSelect
          labelText={`status`}
          name={`searchStatus`}
          onChange={handleSearch}
          value={searchStatus}
          list={['all', ...statusOptions]}
        />
        {/* search by type */}
        <FormRowSelect
          labelText='type'
          name='searchType'
          value={searchType}
          onChange={handleSearch}
          list={['all', ...jobTypeOptions]}
        />
        {/* sort */}
        <FormRowSelect
          name='sort'
          value={sort}
          onChange={handleSearch}
          list={sortOptions}
        />
        <button
          className='btn btn-block btn-danger'
          disabled={isLoading}
          onClick={handleSubmit}
        >
          clear filters
        </button>
      </div>
    </Wrapper>
  )
}

export default SearchContainer
