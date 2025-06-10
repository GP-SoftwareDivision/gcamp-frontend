import { z } from 'zod'

export const sensorSchema = z.object({
  sensorname: z.string().min(1, '센서 이름은 필수입니다.'),
  type: z.string().min(1, '센서 타입은 필수입니다.'),
  code: z.string().min(1, '센서 코드는 필수입니다.'),
  status: z.string().min(1, '센서 상태는 필수입니다.'), // ✅ 변경: 고정값이 아닌 입력값으로
  kitCode: z.string().min(1, 'KIT 코드는 필수입니다.'),
  mac: z.string().optional().nullable(),
  sensorKitId: z.number().optional().nullable(),
})

export type SensorFormValues = z.infer<typeof sensorSchema>

// 센서 상세 + 센서킷 포함 스키마
export const sensorDetailSchema = z.object({
  sensorname: z.string().min(1, '센서 이름을 입력해주세요.'),
  type: z.string().min(1, '센서 타입을 입력해주세요.'),
  code: z.string().min(1, '센서 코드를 입력해주세요.'),
  status: z.enum(['STATUS001', 'STATUS002', 'STATUS003', 'STATUS004', 'STATUS005'], {
    errorMap: () => ({ message: '센서 상태를 선택해주세요.' }),
  }),
  sensorKits: z
    .array(
      z.object({
        sensorKitId: z.number(),
        name: z.string().min(1, '센서킷 이름을 입력해주세요.'),
        type: z.string().min(1, '센서킷 타입을 입력해주세요.'),
        code: z.string().min(1, '센서킷 코드를 입력해주세요.'),
        status: z.string().min(1, '센서킷 상태를 입력해주세요.'),
        mac: z.string().nullable().optional(),
      })
    )
    .min(1, '센서킷을 하나 이상 추가해주세요.'),
})

export type SensorDetailsFormValues = z.infer<typeof sensorDetailSchema>
