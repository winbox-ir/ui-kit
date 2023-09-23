"use client"
import { IoChevronDown } from "react-icons/io5"

type Paged<T> = {
  data: T[]
  limit: number
  offset: number
  hasNextPage: boolean
  totalCount: number
}

type Props = {
  listMeta: Paged<any>
  onPageChange?: (offset: number, limit: number) => void
  paginationType: "seeMore" | "numbering"
  className?: string
}
export const TablePagination: React.FC<Props> = ({ listMeta, onPageChange, paginationType, className }) => {
  const seeMore = () => {
    if (onPageChange) {
      onPageChange(listMeta.data.length, listMeta.limit)
    }
  }

  // const changePage = (page: number) => {
  //   if (onPageChange) {
  //     onPageChange(page, listMeta.size)
  //   }
  // }

  // if (listMeta.totalPages <= 1) {
  //   return <div></div>
  // }

  // if (paginationType == "numbering") {
  //   return (
  //     <div className={`flex justify-center items-center ${className}`}>
  //       {listMeta.page > 0 && (
  //         <Button type="button" theme="outline-primary" className="w-10 h-10 mx-1" Size="sm" onClick={() => changePage(listMeta.page - 1)}>
  //           {listMeta.page}
  //         </Button>
  //       )}

  //       <Button type="button" className="w-10 h-10 mx-1" Size="sm" onClick={() => {}}>
  //         {listMeta.page + 1}
  //       </Button>

  //       {listMeta.page + 1 < listMeta.totalPages && (
  //         <Button type="button" theme="outline-primary" className="w-10 h-10 mx-1" Size="sm" onClick={() => changePage(listMeta.page + 1)}>
  //           {listMeta.page + 2}
  //         </Button>
  //       )}
  //     </div>
  //   )
  // }

  return (
    <div className={`px-4 py-3 flex items-center justify-center sm:px-6 ${className}`}>
      {Number(listMeta.totalCount) > listMeta.data.length && (
        <a onClick={seeMore} className="inline-flex flex-col items-center text-blue-500 hover:text-blue-700 text-sm cursor-pointer">
          <span className="inline-block mb-2">نمایش بیشتر</span>
          <IoChevronDown className="w-4 h-4" />
        </a>
      )}
    </div>
  )
}
