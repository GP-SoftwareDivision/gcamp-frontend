import { z } from 'zod'

export const signSchema = z
  .object({
    username: z
      .string()
      .min(5, '아이디는 5자 이상이어야 합니다.')
      .max(15, '아이디는 15자 이하로 입력해주세요.')
      .regex(/^[a-z]+[a-z0-9]*$/, '아이디는 소문자 영문으로 시작하고 숫자 조합만 허용됩니다.'),
    newPassword: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상')
      .max(16, '비밀번호는 최대 16자 이하')
      .regex(
        /(?=.*[0-9])(?=.*[a-zA-Z])(?=.*\W)(?=^\S+$)/,
        '비밀번호는 문자/숫자/특수문자를 포함해야 합니다.'
      ),
    confirmationPassword: z.string(),
    name: z.string().min(2, '이름은 2자 이상'),
    email: z.string().email('이메일 형식이 올바르지 않습니다.'),
    phone: z.string().regex(/^010-\d{4}-\d{4}$/, '010-1234-5678 형식으로 입력해주세요'),

    farmRegisterReq: z
      .array(
        z.object({
          farmName: z.string().optional(),
          zipCode: z
            .string()
            .optional()
            .superRefine((val, ctx) => {
              if (val && val.length !== 5) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: '우편번호는 5자리여야 합니다.',
                })
              }
            }),
          address: z
            .string()
            .optional()
            .superRefine((val, ctx) => {
              if (val && val.trim().length < 1) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: '주소를 입력해주세요.',
                })
              }
            }),
          addressDetail: z
            .string()
            .optional()
            .superRefine((val, ctx) => {
              if (val && val.trim().length < 1) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: '상세주소를 입력해주세요.',
                })
              }
            }),
          goodCode: z
            .string()
            .optional()
            .superRefine((val, ctx) => {
              if (val && val.trim().length < 1) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: '작물을 선택해주세요.',
                })
              }
            }),
          sensorKitCode: z
            .array(z.string())
            .optional()
            .superRefine((val, ctx) => {
              if (val && val.length > 0 && val.some((v) => v.trim() === '')) {
                ctx.addIssue({
                  code: z.ZodIssueCode.custom,
                  message: '센서 KIT을 정확히 선택해주세요.',
                })
              }
            }),
        })
      )
      .optional(),
  })
  .refine((data) => data.newPassword === data.confirmationPassword, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmationPassword'],
  })

export type SignFormValues = z.infer<typeof signSchema>
