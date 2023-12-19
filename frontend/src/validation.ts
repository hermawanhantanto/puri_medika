import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const registerSchema = z.object({
  nomor_identitas: z.string().min(16).max(16),
  tanggal_lahir: z.date(),
  jenis_kelamin: z.enum(["L", "P"]),
});

export const dokterSchema = z.object({
  nama: z.string().min(3).max(50),
  spesialis: z.string().min(5).max(50),
  nomor_izin_praktek: z.string().min(12).max(12),
  alamat: z.string().min(10).max(255),
  jenis_kelamin: z.enum(["L", "P"]),
  no_telp: z.string().min(10).max(13),
});

export const ruangSchema = z.object({
  nama: z.string().min(3).max(50),
  keterangan: z.string().min(5).max(255),
  status: z.enum(["tersedia", "tidak tersedia"]),
  kapasitas: z.string().min(1).max(3),
});

export const pendaftaranSchema = z.object({
  user_id: z.string(),
  ruang_id: z.string(),
  dokter_id: z.string(),
  tanggal_pendaftaran: z.date(),
  status: z.enum(["pending", "selesai"]),
});

export const rekamMedisSchema = z.object({
  pendaftaran_id: z.string(),
  keluhan: z.string().min(5).max(255),
  diagnosa: z.string().min(5).max(255),
  tindakan: z.string().min(5).max(255),
  keterangan: z.string().min(10).max(255),
});

export const pendaftaranPasienSchema = z.object({
  dokter_id: z.string(),
  ruang_id: z.string(),
  tanggal_pendaftaran: z.date(),
});

export const editProfileSchema = z.object({
  nama: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(8).max(50),
  nomor_telepon: z.string().min(10).max(13),
  alamat: z.string().min(10).max(255),
});
