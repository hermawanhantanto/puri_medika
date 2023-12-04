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
    path: "/admin/rekam-medis",
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
