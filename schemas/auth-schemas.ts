import { Schema, z, ZodSchema } from "zod";

type weight_grains = {
  weight: number;
  name: string;
};

export const grain_weight: Array<weight_grains> = [
  { weight: 3.4, name: "Wheat" },
  { weight: 2, name: "Jowar" },
  { weight: 0.419, name: "Bajra" },
  { weight: 2.9, name: "Rice" },
  { weight: 10.5, name: "Tur" },
  { weight: 16.6, name: "Soybean" },
  { weight: 280, name: "Maize" },
  { weight: 18, name: "Gram" },
  { weight: 3.6, name: "Moong" },
  { weight: 4, name: "Urad" },
];

export const LoginSchema = z.object({
  email: z
    .string()
    .min(8, {
      message: "Email must contain at least 8 character(s)",
    })
    .max(40, {
      message: "Email must contain up to 40 character(s) only",
    })
    .email(),
  password: z
    .string()
    .min(8, {
      message: "Password must contain at least 8 character(s)",
    })
    .max(35, {
      message: "Password must contain up to 35 character(s) only",
    }),
});

export const updatePasswordSchema = z.object({
  password: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
  confirmPassword: z
    .string()
    .min(8, { message: "Password must contain at least 8 character(s)" })
    .max(35, { message: "Password must contain up to 35 character(s) only" }),
});

export const registerSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  village: z.string().min(2, {
    message: "Please enter a valid village",
  }),
  state: z.string().min(2, {
    message: "Please enter a valid state.",
  }),
  district: z.string().min(2, {
    message: "Please enter a valid district.",
  }),
  addressLine: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  pincode: z.string().regex(/^\d{6}$/, {
    message: "Please enter a valid 6-digit pincode.",
  }),
});
export const resetPassSchema = z.object({
  email: z
    .string()
    .min(8, { message: "Email must contain at least 8 character(s)" })
    .max(40, { message: "Email must contain up to 40 character(s) only" })
    .email({ message: "Must be a valid email address" }),
});

export const crsRequestSchema = z.object({
  n: z.coerce
    .number()
    .min(1, { message: "Nitrogen value must be greater than 1" }),
  p: z.coerce
    .number()
    .min(1, { message: "Phosphorus value must be greater than 1" }),
  k: z.coerce
    .number()
    .min(1, { message: "Potassium value must be greater than 1" }),
  ph: z.coerce.number().min(1, { message: "pH value must be greater than 1" }),
  soil_quality: z.enum(["Fertile Soil", "Unfertile Soil"], {
    message: "Please select a valid soil quality.",
  }),
  district: z.string().min(5, { message: "Please enter a valid district." }),
  village: z.string().min(5, { message: "Please enter a valid village." }),
});

export const updateUserSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phoneNumber: z.string().regex(/^\d{10}$/, {
    message: "Please enter a valid 10-digit phone number.",
  }),
  state: z.string().min(2, {
    message: "Please enter a valid state.",
  }),
  district: z.string().min(2, {
    message: "Please enter a valid district.",
  }),
  addressLine: z.string().min(2, {
    message: "Please enter a valid address.",
  }),
  village: z.string().min(2, {
    message: "Please enter a valid village",
  }),
  pincode: z.string().regex(/^\d{6}$/, {
    message: "Please enter a valid 6-digit pincode.",
  }),
});

export const contactSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  message: z.string().min(2, {
    message: "Message should be greater than 2 characters",
  }),
});

export const yieldCalculatorSchema = z.object({
  crop: z.enum(
    grain_weight.map((grain) => grain.name) as [string, ...string[]],
    {
      message: "Please select a valid soil quality.",
    }
  ),
  avg: z.coerce
    .number()
    .min(1, { message: "Average value must be greater than 1" }),
  num_grains: z.coerce
    .number()
    .min(1, { message: "Number of grains must be greater than 1" }),
  weight_grains: z.coerce
    .number()
    .min(0, { message: "Weight of grains must be greater than 0" }),
});

export function validateFields(data: unknown, schema: ZodSchema) {
  const result = schema.safeParse(data);
  if (!result.success) {
    return result.error;
  }
  return result.data;
}
