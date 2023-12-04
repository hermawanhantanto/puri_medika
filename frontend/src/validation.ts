import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  nama: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  nomor_identitas: z.string().min(16).max(16),
  tanggal_lahir: z.date(),
  jenis_kelamin: z.enum(["L", "P"]),
  nomor_telepon: z.string().min(10).max(13),
  alamat: z.string().min(10).max(255),
});
