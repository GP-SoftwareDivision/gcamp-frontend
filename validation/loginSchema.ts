import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string()
    .min(5, '아이디는 5자 이상이어야 합니다.')
    .max(15, '아이디는 15자 이하로 입력해주세요.')
    .regex(/^[a-z]+[a-z0-9]*$/, '아이디는 소문자 영문으로 시작하고 숫자 조합만 허용됩니다.'),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상')
    .max(16, '비밀번호는 최대 16자 이하')
    .regex(
      /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=^\S+$)/,
      '비밀번호는 문자/숫자/특수문자를 포함해야 합니다.'
    ),
})

export type LoginFormValues = z.infer<typeof loginSchema>
