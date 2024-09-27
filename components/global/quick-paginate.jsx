const QuickPaginate = ({ paginate, current, totalArr }) => {
  console.log(totalArr)
  let lastPageNum = 0
  if (totalArr) {
    lastPageNum = totalArr.pageCount || 0
  }
  let indexArray
  if (totalArr) {
    indexArray = [...new Array(lastPageNum)].map((num, i) => (num = i + 1))
  }
  return (
    <div className="c-pagination">
      {totalArr &&
        indexArray
          .slice(
            current < 3 ? 0 : current - 2,
            current < 2 ? current + 2 : current + 1,
          )
          .map((ind) => (
            <div
              key={ind}
              onClick={() => paginate(ind)}
              className={`c-pagination__number ${
                ind === current ? 'active' : ''
              }`}
              style={{ display: `${ind === lastPageNum ? 'none' : 'block'}` }}
            >
              {ind}
            </div>
          ))}
      {lastPageNum >= 3 && (
        <div
          className={`c-pagination__number ${
            lastPageNum === current ? 'active' : ''
          }`}
          onClick={() => paginate(lastPageNum)}
        >
          {lastPageNum === current ? lastPageNum : `...${lastPageNum}`}
        </div>
      )}
    </div>
  )
}
export default QuickPaginate
