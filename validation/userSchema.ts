import { z } from 'zod'

const farmSchema = z.object({
  farm_name: z.string().min(1, '농장명을 입력하세요.'),
  address: z.string().min(1, '기본주소를 입력하세요.'),
  address_detail: z.string().min(1, '상세주소를 입력하세요.'),
  zip_code: z.string().regex(/^\d{5}$/, '우편번호는 5자리여야 합니다.'),
  crop: z.string().min(1, '작물을 선택하세요.'),
  sensor_name: z.array(z.string()).min(1, '센서KIT을 하나 이상 선택하세요.'),
})

export const userSchema = z.object({
  name: z.string().min(2, '이름은 2자 이상 입력하세요.'),
  username: z.string().min(2, '아이디는 2자 이상 입력하세요.'),
  phone: z.string().regex(/^01[0-9]\d{3,4}\d{4}$/, '전화번호 형식이 올바르지 않습니다.'),
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  farms: z.array(farmSchema).min(1, '농장 정보를 최소 1개 이상 입력하세요.'),
})

export type UserFormValues = z.infer<typeof userSchema>
export type FarmType = z.infer<typeof farmSchema>
