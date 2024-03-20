import { z, ZodType } from "zod";

export class ItemValidation {
  static readonly GET_ITEM: ZodType = z.object({
    name: z.string().min(3).max(100),
    token: z.string(),
    quantity: z.number().positive()
  })

  static readonly POST_ITEM: ZodType = z.object({
    name: z.string().min(3).max(100),
    quantity: z.number().positive(),
    userId: z.string().min(5).max(100)
  })

  static readonly PUT_ITEM: ZodType = z.object({
    name: z.string().min(3).max(100),
    quantity: z.number().positive(),
    userId: z.string().min(5).max(100)
  })

  static readonly DELETE_ITEM: ZodType = z.object({
    name: z.string().min(3).max(100),
    userId: z.string().min(5).max(100)
  })
}