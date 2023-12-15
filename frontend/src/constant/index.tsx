import { RiHome6Line } from "react-icons/ri";
import { FaUserInjured } from "react-icons/fa";
import { FaWpforms } from "react-icons/fa6";
import { RiHospitalLine } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { FaHospitalUser } from "react-icons/fa6";

export const sideBarLinks = [
  {
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <RiHome6Line />,
  },
  {
    name: "Pasien",
    path: "/admin/pasien",
    icon: <FaUserInjured />,
  },
  {
    name: "Dokter",
    path: "/admin/dokter",
    icon: <FaUserDoctor />,
  },
  {
    name: "Pendaftaran",
    path: "/admin/pendaftaran",
    icon: <FaWpforms />,
  },
  {
    name: "Ruang",
    path: "/admin/ruang",
    icon: <RiHospitalLine />,
  },
  {
    name: "Rekam Medis",
    path: "/admin/rekammedis",
    icon: <FaHospitalUser />,
  },
];

export const tableHeaderPasien = [
  { label: "Nama", key: "nama" },
  { label: "Email", key: "email" },
  { label: "Nomor Identitas", key: "nomor_identitas" },
  { label: "Tanggal Lahir", key: "tanggal_lahir" },
  { label: "Alamat", key: "alamat" },
  { label: "Jenis Kelamin", key: "jenis_kelamin" },
  { label: "Nomor Telepon", key: "nomor_telepon" },
];

export const tableHeaderDokter = [
  { label: "Nama", key: "nama" },
  { label: "Spesialis", key: "spesialis" },
  { label: "Nomor Izin Praktek", key: "nomor_izin_praktek" },
  { label: "Alamat", key: "alamat" },
  { label: "Jenis Kelamin", key: "jenis_kelamin" },
  { label: "Nomor Telepon", key: "no_telp" },
];

export const tableHeaderRuang = [
  { label: "Nama", key: "nama" },
  { label: "Keterangan", key: "keterangan" },
  { label: "Status", key: "status" },
  { label: "Kapasitas", key: "kapasitas" },
];

export const tableHeaderPendaftaran = [
  { label: "Nama Pasien", key: "nama_pasien" },
  { label: "Nama Dokter", key: "nama_dokter" },
  { label: "Nama Ruang", key: "nama_ruang" },
  { label: "Nomor Identitas", key: "nomor_identitas" },
  { label: "Status", key: "status" },
  { label: "Tanggal Pendaftaran", key: "tanggal_pendaftaran" },
];

export const tableHeaderRekamMedis = [
  { label: "Nama Pasien", key: "nama_pasien" },
  { label: "Nomor Identitas", key: "nomor_identitas" },
  { label: "Keluhan", key: "keluhan" },
  { label: "Diagnosa", key: "diagnosa" },
  { label: "Tindakan", key: "tindakan" },
  { label: "Keterangan", key: "keterangan" },
  { label: "Jenis Kelamin", key: "jenis_kelamin" },
];

// user
export const navbar = [
  { label: "Beranda", path: "/" },
  { label: "Pendaftaran", path: "/pendaftaran" },
  { label: "Dokter", path: "/dokter" },
  { label: "Ruang", path: "/ruang" },
];
