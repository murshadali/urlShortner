import {z} from 'zod'

export const urlValidate = z.object({
    url: z.string(),
    code: z.string().optional(),
})