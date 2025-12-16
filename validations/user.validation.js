import {z} from 'zod';
export const userValidationSchema = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email:z.string().email(),
    password: z.string().min(3)
})
// here, i create a object userValidationsSchema. and we pass or body objec into this object the zod match the constraints occording to the given schema