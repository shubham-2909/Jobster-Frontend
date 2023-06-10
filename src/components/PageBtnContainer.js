import { useSelector, useDispatch } from 'react-redux'
import Wrapper from '../assets/wrappers/PageBtnContainer'
import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi'
import { changePage } from '../features/allJobs/allJobsSlice'

const PageBtnContainer = () => {
  const dispatch = useDispatch()
  const { numOfPages, page } = useSelector((store) => store.allJobs)
  const pages = Array.from({ length: numOfPages }, (_, index) => {
    return index + 1
  })
  const prevPage = () => {
    let newPage = page - 1
    if (newPage < 1) {
      newPage = numOfPages
    }
    dispatch(changePage(newPage))
  }
  const nextPage = () => {
    let newPage = page + 1
    if (newPage > numOfPages) {
      newPage = 1
    }
    dispatch(changePage(newPage))
  }
  return (
    <Wrapper>
      <button className='prev-btn' type='button' onClick={prevPage}>
        prev
        <HiChevronDoubleLeft />
      </button>
      <div className='btn-container'>
        {pages.map((pageNumber) => {
          return (
            <button
              type='button'
              className={pageNumber === page ? 'pageBtn active' : 'pageBtn'}
              onClick={() => dispatch(changePage(pageNumber))}
              key={pageNumber}
            >
              {pageNumber}
            </button>
          )
        })}
      </div>
      <button className='next-btn' type='button' onClick={nextPage}>
        next
        <HiChevronDoubleRight />
      </button>
    </Wrapper>
  )
}

export default PageBtnContainer
