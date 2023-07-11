import React, { useEffect, useRef, useState } from "react"
import { SvgLoading } from "./SvgLoading"
// import { Pagination } from './Pagination'
import { SvgEmptyList } from "./SvgEmptyList"
import { TablePagination } from "./TablePagination"
import classNames from "classnames"

type Paged<T> = {
  data: T[]
  limit: number
  offset: number
  hasNextPage: boolean
  totalCount: number
}

type Props = {
  // onChangePage?: (page: number, pageSize: number) => void
  hiddenHeaders?: boolean
  pagination?: Paged<any>
  onLoadMore?: (offset: number, limit: number) => void
  tableHead: (TableHead | undefined)[]
  size?: "xs" | "sm" | "md" | "lg"
  containerClassName?: string
  data: {
    [key: string]: ((seeMoreClicked?: () => void) => React.ReactNode) | number | string | React.ReactNode | JSX.Element
  }[]
  loading?: boolean
  paginationType?: "seeMore" | "numbering"
  footerValues?: {
    total?: React.ReactNode
    totalDiscount?: React.ReactNode
    payment?: React.ReactNode
    remind?: React.ReactNode
    extra?: React.ReactNode
  }
  tableClassName?: string
  tbodyClassName?: string
  theadClassName?: string
  selectable?: boolean
  onSelectItem?: (ids: (string | number)[]) => void
  selectedItems?: (number | string)[]
}

export type TableHead = {
  id: string
  name?: string | React.ReactNode
  className?: string
  sortable?: boolean
  minWidth?: boolean
  dataAlign?: "start" | "center" | "end"
  unprintable?: boolean
}

const paddingSizes = {
  xs: "px-2 py-1 text-xs print:text-xs",
  sm: "px-2 py-1 text-sm print:text-xs",
  md: "px-6 py-2 text-md print:text-sm",
  lg: "px-6 py-3 text-lg print:text-base",
}
const textAligns = {
  start: "text-start",
  center: "text-center",
  end: "text-end",
}

export const Table: React.FC<Props> = ({
  selectedItems,
  size = "md",
  loading = true,
  selectable = false,
  pagination,
  onLoadMore,
  footerValues,
  hiddenHeaders,
  tableClassName,
  theadClassName,
  tbodyClassName,
  onSelectItem,
  ...props
}) => {
  const [openDetail, setOpenDetail] = useState<number>()
  // const [checkboxesValue, setCheckboxValue] = useState<{ id: number | string; checked: boolean }[]>([])
  const pSize = paddingSizes[size]
  const mainCheckboxRef = useRef<HTMLInputElement>(null)
  const [sortField, setSortField] = useState<string>("")

  const handleSort = (target: string) => {
    if (!sortField.includes(target)) {
      setSortField(`${target}:desc`)
    } else if (sortField.includes(`${target}:desc`)) {
      setSortField(`${target}:asc`)
    } else {
      setSortField("")
    }
  }

  // useEffect(() => {

  // }, [props.data])

  const toggleAllItems = (checked: boolean) => {
    if (onSelectItem) {
      if (checked) {
        onSelectItem(props.data.map((row) => row["id"] as string))
      } else {
        onSelectItem([])
      }
    }
    // setCheckboxValue(checkboxesValue.map((x) => ({ id: x.id, checked })))
  }

  // onSelectItem(checkboxesValue.filter((x) => x.checked).map((x) => x.id))

  // useEffect(() => {
  //   if (onSelectItem) {
  //     onSelectItem(checkboxesValue.filter((x) => x.checked).map((x) => x.id))
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [checkboxesValue])

  // useEffect(() => {
  //   if (mainCheckboxRef.current) {
  //     if (selectedItems && selectedItems.length > 0 && checkboxesValue.filter((x) => x.checked).length != checkboxesValue.length) {
  //       mainCheckboxRef.current.indeterminate = true
  //     } else {
  //       mainCheckboxRef.current.indeterminate = false
  //     }
  //     // if (checkboxesValue && checkboxesValue.filter((x) => x.checked).length == 0) {
  //     //   mainCheckboxRef.current.indeterminate = false
  //     // }
  //   }
  // }, [selectedItems])

  return (
    <>
      <div
        className={`relative overflow-x-auto overflow-y-visible hideScrollbar flex-col border rounded-xl dark:border-gray-700 print:border-none relative ${
          props.containerClassName ?? ""
        } print:min-h-0`}
        style={{ minHeight: 250 }}
      >
        {loading && (
          <div
            className="absolute left-0 right-0 top-0 bottom-0 z-20 flex justify-center items-center print:hidden"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.15)", minHeight: 50 }}
          >
            <div className="inline-flex flex-col items-center justify-center">
              <SvgLoading className="w-14 mb-3" />
              <span>درحال بروزرسانی</span>
            </div>
          </div>
        )}
        <table className={classNames("w-full min-w-[1000px]", tableClassName)}>
          {!hiddenHeaders && (
            <thead className={classNames("bg-gray-100 dark:bg-gray-800 border-b dark:border-gray-800", theadClassName)}>
              <tr>
                {selectable && (
                  <th scope="col" className={`font-light whitespace-nowrap print:border print:bg-gray-100 text-gray-600 dark:text-gray-200 print:hidden `}>
                    <input
                      type="checkbox"
                      ref={mainCheckboxRef}
                      checked={selectedItems && selectedItems.length == props.data?.length && selectedItems.length > 0 ? true : false}
                      onChange={(e) => toggleAllItems(e.currentTarget.checked)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                    />
                  </th>
                )}

                {props.tableHead.map((thItem, index) => {
                  if (!thItem) return
                  const txtAlign = textAligns[thItem?.dataAlign ?? "start"]
                  return (
                    <th
                      key={index}
                      scope="col"
                      className={`${txtAlign} font-light whitespace-nowrap print:border print:bg-gray-100 text-gray-600 dark:text-gray-200 ${pSize} ${
                        thItem.minWidth ? "w-0" : ""
                      } ${thItem.unprintable ? "print:hidden" : ""} ${thItem.className ?? ""}`}
                    >
                      {!thItem.sortable ? (
                        thItem.name
                      ) : (
                        <div
                          className={`${txtAlign}  flex justify-center items-center cursor-pointer ${sortField.includes(thItem.id) && "text-sky-300"}`}
                          onClick={() => handleSort(thItem.id)}
                        >
                          {thItem.name}
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512">
                            <path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                          </svg>
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody className={classNames(tbodyClassName)}>
            {props.data.length == 0 && !loading && (
              <tr className="print:hidden">
                <td colSpan={props.tableHead.length}>
                  <div className="flex flex-col justify-center items-center p-8">
                    <SvgEmptyList className="w-20 h-20" />
                    <p className="text-gray-500 mt-5 text-sm">موردی یافت نشد</p>
                  </div>
                </td>
              </tr>
            )}
            {props.data
              .sort((a, b) => {
                if (sortField) {
                  if (typeof a[sortField.split(":")?.[0]] == "string") {
                    return sortField.split(":")?.[1] == "asc"
                      ? Number(a[sortField.split(":")?.[0]]) - Number(b[sortField.split(":")?.[0]])
                      : Number(b[sortField.split(":")?.[0]]) - Number(a[sortField.split(":")?.[0]])
                  } else {
                    return sortField.split(":")?.[1] == "asc"
                      ? Number((a[sortField.split(":")?.[0]] as React.ReactElement)?.props?.id) - Number((b[sortField.split(":")?.[0]] as React.ReactElement)?.props?.id)
                      : Number((b[sortField.split(":")?.[0]] as React.ReactElement)?.props?.id) - Number((a[sortField.split(":")?.[0]] as React.ReactElement)?.props?.id)
                  }
                } else {
                  return 0
                }
              })
              .map((row, rowIndex) => {
                const rowClass = row["rowClass"]
                return (
                  <React.Fragment key={rowIndex}>
                    <tr
                      className={`${rowClass ? rowClass : rowIndex % 2 == 1 ? "bg-gray-50 dark:bg-gray-800" : "bg-white dark:bg-gray-900"} ${
                        row.seeMore ? "cursor-pointer" : ""
                      } border-b dark:border-gray-800`}
                    >
                      {selectable && (
                        <td className={`relative text-gray-900 dark:text-gray-100 text-center print:border print:hidden`}>
                          <input
                            type="checkbox"
                            checked={selectedItems?.some((x) => x == row["id"])}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-lg dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                            onChange={(e) => {
                              if (onSelectItem) {
                                if (e.target.checked) {
                                  onSelectItem([...(selectedItems ?? []), row["id"] as string])
                                } else {
                                  onSelectItem((selectedItems ?? []).filter((x) => x != (row["id"] as string)))
                                }
                              }
                              // checkboxesValue[rowIndex].checked = e.currentTarget?.checked
                              // setCheckboxValue([...checkboxesValue])
                            }}
                          />
                        </td>
                      )}
                      {props.tableHead
                        // .filter((x) => typeof x != "undefined")
                        .map((x) => x?.id)
                        .map((key, colIndex) => {
                          if (typeof key == "undefined") return
                          let res
                          let val = row[key] ?? ""
                          const txtAlign = textAligns[props.tableHead[colIndex]?.dataAlign ?? "start"]
                          const cellClassName = props.tableHead[colIndex]?.className ?? ""
                          const cellUnprintable = props.tableHead[colIndex]?.unprintable ?? ""
                          if (typeof val == "function") {
                            res = val(() => (rowIndex == openDetail ? setOpenDetail(undefined) : setOpenDetail(rowIndex)))
                          } else {
                            res = val
                          }
                          return (
                            <td key={colIndex} className={classNames(`relative text-gray-900 dark:text-gray-100 print:border`, txtAlign, pSize, cellUnprintable, cellClassName)}>
                              {res}
                            </td>
                          )
                        })}
                    </tr>
                    {row.seeMore && openDetail == rowIndex && (
                      <tr>
                        <td colSpan={props.tableHead.length + (selectable ? 1 : 0)}>{typeof row.seeMore == "function" ? row.seeMore() : row.seeMore}</td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
          </tbody>
          <tfoot className="hidden print:table-footer-group">
            <tr className="border">
              <td colSpan={props.tableHead.length - 2 - props.tableHead.filter((x) => x?.unprintable).length} rowSpan={4}>
                <div className="grid grid-cols-2 p-4">
                  <p className="col-span-2 text-xs" style={{ minHeight: 50 }}>
                    توضیحات: {footerValues?.extra}
                  </p>
                  <p className="text-xs">مهر و امضا فروشنده </p>
                  <p className="text-xs">امضا خریدار</p>
                </div>
              </td>
              {footerValues?.total && (
                <>
                  <td className="border print:bg-gray-100 text-xs p-2 py-1">جمع کل</td>
                  <td className="border print:bg-gray-100 font-semibold p-2 py-1">{footerValues.total}</td>
                </>
              )}
            </tr>

            {footerValues?.totalDiscount && (
              <tr className="border">
                <td className="border print:bg-gray-100 text-xs p-2 py-1">کل تخفیف</td>
                <td className="border print:bg-gray-100 font-semibold p-2 py-1">{footerValues.totalDiscount}</td>
              </tr>
            )}

            {footerValues?.payment && (
              <tr className="border">
                <td className="border print:bg-gray-100 text-xs p-2 py-1">قابل پرداخت</td>
                <td className="border print:bg-gray-100 font-semibold p-2 py-1">{footerValues.payment}</td>
              </tr>
            )}
            {footerValues?.remind && (
              <tr className="border">
                <td className="border print:bg-gray-100 text-xs p-2 py-1">مانده</td>
                <td className="border print:bg-gray-100 font-semibold p-2 py-1">{footerValues?.remind}</td>
              </tr>
            )}
          </tfoot>
        </table>
      </div>
      {pagination?.hasNextPage && <TablePagination listMeta={pagination} onPageChange={onLoadMore} paginationType={props.paginationType ?? "seeMore"} className="mt-4" />}
    </>
  )
}
