'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { userData as mockData, UserType } from '@/mock/userData'
import GenericDataTableWrapper from '@/components/GenericDataTableWrapper'
import RegisterModal from '@/components/RegisterModal'

export default function ClientHome() {
  const router = useRouter()
  const [tableData, setTableData] = useState<UserType[]>(mockData)

  const handleDelete = (row: UserType) => {
    const updated = tableData.filter((user) => user.username !== row.username)
    setTableData(updated)
    console.log('✅ 삭제된 사용자:', row.username)
  }

  return (
    <GenericDataTableWrapper<UserType>
      data={tableData}
      filterFn={(item, text) =>
        item.name.toLowerCase().includes(text.toLowerCase()) ||
        item.username.toLowerCase().includes(text.toLowerCase()) ||
        item.phone.includes(text) ||
        item.email.toLowerCase().includes(text.toLowerCase())
      }
      columns={[
        {
          name: '번호',
          selector: (row) => row.accountId ?? '',
          sortable: true,
          grow: 1, // 좁게 설정
        },
        {
          name: '아이디',
          selector: (row) => row.username,
          sortable: true,
          grow: 1, // 적당히
        },
        {
          name: '이름',
          selector: (row) => row.name,
          sortable: true,
          grow: 1,
        },
        {
          name: '연락처',
          cell: (row) => {
            const phone = row.phone.replace(/\D/g, '')
            const formatted =
              phone.length === 11
                ? `${phone.slice(0, 3)}-${phone.slice(3, 7)}-${phone.slice(7)}`
                : phone
            return <span>{formatted}</span>
          },
          grow: 1,
        },
        {
          name: '주소',
          selector: (row) => row.address || '주소 없음',
          wrap: true,
          grow: 1.8, // 주소는 넓게
        },
        {
          name: '이메일',
          selector: (row) => row.email,
          grow: 1.2,
        },
        {
          name: '회원형태',
          cell: (row) => (
            <span className='px-3 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300'>
              {row.role}
            </span>
          ),
          sortable: true,
          grow: 1,
        },
      ]}
      filename='회원목록.csv'
      exportHeaders={['아이디', '이름', '연락처', '이메일', '주소']}
      exportKeys={['username', 'name', 'phone', 'email', 'address']}
      getRowKey={(row) => row.username}
      onEdit={(row) => router.push(`/home/${row.username}`)}
      onDelete={handleDelete}
      ModalComponent={RegisterModal}
    />
  )
}
