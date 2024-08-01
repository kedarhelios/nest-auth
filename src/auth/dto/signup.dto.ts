// import {
//   IsEmail,
//   IsNotEmpty,
//   IsString,
//   MaxLength,
//   MinLength,
// } from 'class-validator';

// export class SignUpDto {
//   @IsNotEmpty()
//   @IsString()
//   name: string;

//   @IsNotEmpty()
//   @IsEmail({}, { message: 'Please enter a valid email id!' })
//   email: string;

//   @IsNotEmpty()
//   @IsString()
//   @MinLength(4)
//   @MaxLength(20)
//   password: string;
// }

import { z } from 'zod';

export const signUpDtoSchema = z
  .object({
    name: z.string({
      required_error: 'Name is required',
      invalid_type_error: 'Name must be a string',
    }),
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .email({ message: 'Emai is invalid!' }),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(4, { message: 'Password must be atleast 4 characters long' })
      .max(20, { message: 'Password must be atmost 20 characters long' }),
  })
  .required();

export type SignUpDto = z.infer<typeof signUpDtoSchema>;
