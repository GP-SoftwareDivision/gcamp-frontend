import { z } from 'zod'

export interface SensorKitSensor {
  code: string
  name: string
  type: string
}

export interface SensorKitFormValues {
  name: string
  code: string
  type: '하우스' | '노지'
  status: '정상' | '이상' | '점검중' | '불량' | '폐기'
  useStatus: '사용중' | '미사용'
  mac: string
  sensorRes: SensorKitSensor[]
}

export const sensorKitSchema = z.object({
  name: z.string().min(1, '센서킷 이름은 필수입니다.'),
  code: z.string().min(1, '센서킷 코드는 필수입니다.'),
  mac: z.string().min(1, 'MAC 주소는 필수입니다.'),
  status: z.enum(['정상', '이상', '점검중', '불량', '폐기'], {
    errorMap: () => ({ message: '센서킷 상태를 선택해주세요.' }),
  }),
  type: z.enum(['하우스', '노지'], {
    errorMap: () => ({ message: '센서킷 타입을 선택해주세요.' }),
  }),
  useStatus: z.enum(['사용중', '미사용'], {
    errorMap: () => ({ message: '사용 상태를 선택해주세요.' }),
  }),
  sensorRes: z
    .array(
      z.object({
        code: z.string().min(1, '센서 코드 입력 필요'),
        name: z.string().min(1, '센서 이름 입력 필요'),
        type: z.string().min(1, '센서 타입 입력 필요'),
      })
    )
    .min(0),
})
