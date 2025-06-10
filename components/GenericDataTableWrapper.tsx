'use client'

import { useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import DataTable, { TableColumn } from 'react-data-table-component'
import { SearchIcon, Plus, Download, Pencil, Trash2, EllipsisVertical } from 'lucide-react'
import { useClickAway } from 'react-use'
import AlertModal from '@/components/AlertModal'
import { DropdownMenu } from '@/components/DropdownMenu'
import { motion } from 'framer-motion'
import EmptyFarmInfoCard from '@/components/EmptyFarmInfoCard'

interface GenericDataTableProps<T> {
  data?: T[]
  filterFn: (item: T, text: string) => boolean
  columns: TableColumn<T>[]
  filename: string
  exportHeaders: string[]
  exportKeys: (keyof T)[]
  getRowKey: (row: T) => string
  onEdit: (row: T) => void
  onDelete: (row: T) => void
  ModalComponent?: React.ComponentType<{ onClose: () => void }>
}

function formatPhoneNumber(phone?: string): string {
  if (!phone) return ''
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 11) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`
  } else if (digits.length === 10) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
  }
  return digits
}

function mapSensorStatus(code?: string): string {
  const statusMap: Record<string, string> = {
    '001': '정상',
    '002': '이상',
    '003': '수리',
    '004': '불량',
    '005': '폐기',
  }
  return code ? statusMap[code] ?? code : ''
}

function ActionCellComponent<T>({
  row,
  getRowKey,
  onEdit,
  openDropdownKey,
  setOpenDropdownKey,
  setSelectedItem,
  setShowDeleteAlert,
}: {
  row: T
  getRowKey: (row: T) => string
  onEdit: (row: T) => void
  openDropdownKey: string | null
  setOpenDropdownKey: (key: string | null) => void
  setSelectedItem: (item: T) => void
  setShowDeleteAlert: (show: boolean) => void
}) {
  const ref = useRef<HTMLButtonElement | null>(null)
  useClickAway(ref, () => {
    if (openDropdownKey === getRowKey(row)) setOpenDropdownKey(null)
  })

  return (
    <div className='relative'>
      <button
        ref={ref}
        onClick={() => {
          setOpenDropdownKey(openDropdownKey === getRowKey(row) ? null : getRowKey(row))
        }}
        className='p-0.5 hover:bg-white hover:shadow-sm rounded-full hover:cursor-pointer'
      >
        <EllipsisVertical className='size-7 p-1 text-gray-500 hover:text-gray-900 bg-gray-200 rounded-full' />
      </button>

      {openDropdownKey === getRowKey(row) && (
        <DropdownMenu open anchor='bottom' triggerRef={ref}>
          <div className='w-32'>
            <button
              onMouseDown={() => onEdit(row)}
              className='w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover: rounded-xl'
            >
              <Pencil className='w-4 h-4 mr-2' /> 수정
            </button>
            <div className='border-b border-gray-200' />
            <button
              onMouseDown={() => {
                setSelectedItem(row)
                setShowDeleteAlert(true)
              }}
              className='w-full flex items-center px-4 py-2 text-xs text-gray-700 hover:bg-gray-100 hover:rounded-xl'
            >
              <Trash2 className='w-4 h-4 mr-2 text-red-500' /> 삭제
            </button>
          </div>
        </DropdownMenu>
      )}
    </div>
  )
}

export default function GenericDataTableWrapper<T extends { name?: string }>(
  props: GenericDataTableProps<T>
) {
  const {
    data,
    filterFn,
    columns,
    filename,
    exportHeaders,
    exportKeys,
    getRowKey,
    onEdit,
    onDelete,
    ModalComponent,
  } = props

  const pathname = usePathname()
  const [filterText, setFilterText] = useState('')
  const [showDeleteAlert, setShowDeleteAlert] = useState(false)
  const [selectedItem, setSelectedItem] = useState<T | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [openDropdownKey, setOpenDropdownKey] = useState<string | null>(null)
  const [hoveredSearch, setHoveredSearch] = useState(false)
  const [hoveredDownload, setHoveredDownload] = useState(false)
  const [hoveredRegister, setHoveredRegister] = useState(false)
  const filteredData = (data ?? []).filter((item) => filterFn(item, filterText))

  const getDownloadLabel = (pathname: string): string => {
    if (pathname.includes('/home')) return '회원정보 다운로드'
    if (pathname.includes('/dataSensor')) return '센서정보 다운로드'
    if (pathname.includes('/sensorKit')) return '센서킷정보 다운로드'
    if (pathname.includes('/notification')) return '알림내역 다운로드'
    if (pathname.includes('/inquiry')) return '문의사항 다운로드'
    if (pathname.includes('/log')) return '이력관리 다운로드'
    return '데이터 다운로드'
  }

  const getRegisterLabel = (pathname: string): string => {
    if (pathname.includes('/home')) return '회원등록'
    if (pathname.includes('/dataSensor')) return '센서등록'
    if (pathname.includes('/sensorKit')) return '센서킷등록'
    if (pathname.includes('/notification')) return '알림등록'
    if (pathname.includes('/inquiry')) return '문의등록'
    if (pathname.includes('/log')) return '이력추가'
    return '등록'
  }

  const getPageTitle = (pathname: string): string => {
    if (pathname.includes('/home')) return '회원정보'
    if (pathname.includes('/dataSensor')) return '센서정보'
    if (pathname.includes('/sensorKit')) return '센서킷관리'
    if (pathname.includes('/notification')) return '알림내역'
    if (pathname.includes('/inquiry')) return '문의사항'
    if (pathname.includes('/log')) return '이력관리'
    return '관리'
  }

  const convertArrayOfObjectsToCSV = (array: T[]): string => {
    const columnDelimiter = ','
    const lineDelimiter = '\n'
    let result = '\uFEFF' + exportHeaders.join(columnDelimiter) + lineDelimiter
    array.forEach((item) => {
      const values = exportKeys.map((key) => {
        const value = item[key] ?? ''
        if (key === 'phone') return `="${value}"`
        return `"${value}"`
      })
      result += values.join(columnDelimiter) + lineDelimiter
    })
    return result
  }

  const downloadCSV = () => {
    const csv = convertArrayOfObjectsToCSV(filteredData)
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.setAttribute('download', filename)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const actionColumn: TableColumn<T> = {
    name: '추가기능',
    cell: (row: T) => (
      <ActionCellComponent
        row={row}
        getRowKey={getRowKey}
        onEdit={onEdit}
        openDropdownKey={openDropdownKey}
        setOpenDropdownKey={setOpenDropdownKey}
        setSelectedItem={setSelectedItem}
        setShowDeleteAlert={setShowDeleteAlert}
      />
    ),
  }

  const processedColumns = columns.map((col) => {
    if (col.name === '연락처' && !col.selector && !col.cell) {
      return {
        ...col,
        cell: (row: T) => <span>{formatPhoneNumber((row as { phone?: string }).phone)}</span>,
      }
    }
    if (col.name === '상태' && !col.selector && !col.cell) {
      return {
        ...col,
        cell: (row: T) => <span>{mapSensorStatus((row as { status?: string }).status)}</span>,
      }
    }
    return col
  })

  return (
    <div className='relative bg-white min-h-screen'>
      <div className='flex justify-between items-center mb-4'>
        <div className='text-lg font-semibold text-gray-800'>{getPageTitle(pathname)}</div>

        <div className='flex gap-3'>
          {/* 검색창 */}
          <motion.div
            onMouseEnter={() => setHoveredSearch(true)}
            onMouseLeave={() => setHoveredSearch(false)}
            initial={{ width: 40 }}
            animate={{ width: hoveredSearch ? 200 : 40 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className='h-10 bg-gray-200 hover:bg-white border border-gray-200 text-black rounded-full flex items-center overflow-hidden px-3 shadow-sm'
          >
            <SearchIcon className='size-4 shrink-0 text-black' />
            <motion.input
              type='text'
              placeholder='검색'
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              initial={{ opacity: 0, x: -10 }}
              animate={{
                opacity: hoveredSearch ? 1 : 0,
                x: hoveredSearch ? 0 : -10,
              }}
              transition={{ duration: 0.15 }}
              className='ml-2 bg-transparent outline-none text-xs w-full placeholder-black'
            />
          </motion.div>

          {/* 등록 버튼 */}
          <motion.button
            onClick={() => setIsModalOpen(true)}
            onMouseEnter={() => setHoveredRegister(true)}
            onMouseLeave={() => setHoveredRegister(false)}
            initial={{ width: 40 }}
            animate={{ width: hoveredRegister ? 110 : 40 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className='cursor-pointer h-10 rounded-full flex items-center overflow-hidden gap-2 border border-gray-200 bg-gray-200 hover:bg-white text-black text-xs px-3 shadow-sm'
          >
            <Plus className='size-4 shrink-0' />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: hoveredRegister ? 1 : 0, x: hoveredRegister ? 0 : -10 }}
              transition={{ duration: 0.15 }}
              className='whitespace-nowrap'
            >
              {getRegisterLabel(pathname)}
            </motion.span>
          </motion.button>
          {/* 다운로드 버튼 */}
          <motion.button
            onClick={downloadCSV}
            onMouseEnter={() => setHoveredDownload(true)}
            onMouseLeave={() => setHoveredDownload(false)}
            initial={{ width: 40 }}
            animate={{ width: hoveredDownload ? 140 : 40 }}
            transition={{ type: 'tween', duration: 0.2 }}
            className='cursor-pointer h-10 rounded-full flex items-center overflow-hidden gap-2 bg-gray-200 hover:bg-white border border-gray-200 text-black text-xs px-3 shadow-sm'
          >
            <Download className='size-4 shrink-0' />
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: hoveredDownload ? 1 : 0, x: hoveredDownload ? 0 : -10 }}
              transition={{ duration: 0.15 }}
              className='whitespace-nowrap'
            >
              {getDownloadLabel(pathname)}
            </motion.span>
          </motion.button>
        </div>
      </div>

      <DataTable
        columns={[...processedColumns, actionColumn]}
        data={filteredData}
        noHeader
        fixedHeader
        fixedHeaderScrollHeight='750px'
        pagination
        paginationPerPage={20}
        paginationRowsPerPageOptions={[20, 40, 60]}
        paginationComponentOptions={{
          rowsPerPageText: '페이지당 행 수',
          rangeSeparatorText: '중',
          noRowsPerPage: true,
          selectAllRowsItem: true,
        }}
        noDataComponent={<EmptyFarmInfoCard>데이터가 존재 하지 않습니다.</EmptyFarmInfoCard>}
        responsive
        highlightOnHover
        striped
        customStyles={{
          rows: { style: { fontSize: '13px' } },
          headCells: { style: { fontSize: '13px', fontWeight: 600 } },
          cells: { style: { fontSize: '13px' } },
          pagination: {
            style: {
              fontSize: '13px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '0px',
              paddingBottom: '20px',
            },
          },
        }}
      />

      {isModalOpen && ModalComponent && <ModalComponent onClose={() => setIsModalOpen(false)} />}

      {showDeleteAlert && selectedItem && (
        <AlertModal
          open={showDeleteAlert}
          type='error'
          title={`${selectedItem?.name ?? '이 항목'}을 삭제하시겠습니까?`}
          confirmText='삭제'
          cancelText='취소'
          onCancel={() => setShowDeleteAlert(false)}
          onConfirm={() => {
            setShowDeleteAlert(false)
            onDelete(selectedItem)
          }}
        />
      )}
    </div>
  )
}
