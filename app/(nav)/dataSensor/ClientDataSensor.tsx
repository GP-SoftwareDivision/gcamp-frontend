'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { sensorData as mockSensorData, SensorType } from '@/mock/sensorData'
import GenericDataTableWrapper from '@/components/GenericDataTableWrapper'
import SensorRegisterModal from '@/components/SensorRegisterModal'

export default function ClientDataSensorPage() {
  const router = useRouter()
  const [data, setData] = useState<SensorType[]>(mockSensorData)

  const statusMap: Record<string, string> = {
    '001': '정상',
    '002': '이상',
    '003': '수리',
    '004': '불량',
    '005': '폐기',
  }

  const handleDelete = (row: SensorType) => {
    const updated = data.filter((s) => s.sensorId !== row.sensorId)
    setData(updated)
    console.log('✅ 삭제된 센서:', row.name)

    // 여기에 실제 삭제 API 호출 로직을 추가할 수 있습니다.
  }

  return (
    <GenericDataTableWrapper<SensorType>
      data={data}
      filterFn={(item, text) =>
        (item.name ?? '').toLowerCase().includes(text.toLowerCase()) ||
        (item.type ?? '').toLowerCase().includes(text.toLowerCase()) ||
        (item.code ?? '').toLowerCase().includes(text.toLowerCase()) ||
        (item.sensorKitCode ?? '').toLowerCase().includes(text.toLowerCase())
      }
      columns={[
        {
          name: '번호',
          selector: (row) => row.sensorId ?? '',
          sortable: true,
        },
        {
          name: '센서이름',
          selector: (row) => row.name ?? '',
          sortable: true,
        },
        {
          name: '센서타입',
          selector: (row) => row.type ?? '',
          sortable: true,
        },
        {
          name: '센서코드',
          selector: (row) => row.code ?? '',
          sortable: true,
        },
        {
          name: 'KIT코드',
          selector: (row) => row.sensorKitCode ?? '',
          cell: (row) => <span className=' text-gray-800 '>{row.sensorKitCode ?? '미사용'}</span>,
          sortable: true,
        },
        {
          name: '상태',
          selector: (row) => row.status ?? '',
          cell: (row) => (
            <span className='px-3 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-300'>
              {statusMap[row.status ?? ''] ?? row.status ?? ''}
            </span>
          ),
          sortable: true,
        },
      ]}
      filename='센서목록.csv'
      exportHeaders={['ID', '센서이름', '타입', '코드', 'KIT코드', '상태']}
      exportKeys={['sensorId', 'name', 'type', 'code', 'sensorKitCode', 'status']}
      getRowKey={(row) => row.code ?? `${row.sensorId}`}
      onEdit={(row) => router.push(`/dataSensor/${row.code}`)}
      onDelete={handleDelete}
      ModalComponent={SensorRegisterModal}
    />
  )
}
