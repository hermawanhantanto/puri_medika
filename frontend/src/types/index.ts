export interface loginParams {
  email: string;
  password: string;
}

export interface registerParams {
  nama: string;
  email: string;
  password: string;
  nomor_identitas: string;
  jenis_kelamin: string;
  tanggal_lahir: Date;
  nomor_telepon: string;
  alamat: string;
}

export interface IPasien {
  id: string;
  nama: string;
  email: string;
  nomor_identitas: string;
  jenis_kelamin: "L" | "P";
  tanggal_lahir: Date;
  nomor_telepon: string;
  alamat: string;
  image?: string;
}

export interface showPasienParams {
  id: string | undefined;
  token: string;
}

export interface editPasienParams {
  id: string;
  nama: string;
  email: string;
  password: string;
  nomor_identitas: string;
  jenis_kelamin: string;
  tanggal_lahir: Date;
  nomor_telepon: string;
  alamat: string;
  token: string;
}

export interface deletePasienParams {
  id: string;
  token: string;
}

export interface GetAllPasienParams {
  token: string;
  page?: string;
  jenis_kelamin?: string;
  orderBy?: string;
}

//dokter admin params
export interface IDokter {
  id: string;
  nama: string;
  spesialis: string;
  nomor_izin_praktek: string;
  alamat: string;
  jenis_kelamin: "L" | "P";
  no_telp: string;
}
export interface GetAllDokterParams {
  token: string;
  page?: string;
  jenis_kelamin?: string;
  orderBy?: string;
}
export interface CreateDokterParams {
  token: string;
  nama: string;
  spesialis: string;
  nomor_izin_praktek: string;
  alamat: string;
  jenis_kelamin: "L" | "P";
  no_telp: string;
}
export interface EditDokterParams {
  id: string;
  nama: string;
  spesialis: string;
  nomor_izin_praktek: string;
  alamat: string;
  jenis_kelamin: "L" | "P";
  no_telp: string;
  token: string;
}
export interface ShowDokterParams {
  id: string | undefined;
  token: string;
}
export interface DeleteDokterParams {
  id: string;
  token: string;
}

//ruang admin params
export interface IRuang {
  id: string;
  nama: string;
  keterangan: string;
  kapasitas: number;
  status: "tersedia" | "tidak tersedia";
}
export interface GetAllRuangParams {
  token: string;
  page?: string;
  orderBy?: string;
  status?: string;
}
export interface CreateRuangParams {
  token: string;
  nama: string;
  keterangan: string;
  status: "tersedia" | "tidak tersedia";
  kapasitas: number;
}
export interface EditRuangParams {
  id: string;
  nama: string;
  keterangan: string;
  kapasitas: number;
  status: "tersedia" | "tidak tersedia";
  token: string;
}
export interface ShowRuangParams {
  id: string | undefined;
  token: string;
}
export interface DeleteRuangParams {
  id: string;
  token: string;
}

//pendaftaran admin params
export interface GetAllPendaftaranParams {
  token: string;
  page?: string;
  orderBy?: string;
  status?: string;
}

export interface CreatePendaftaranParams {
  token: string;
  user_id: number;
  dokter_id: number;
  ruang_id: number;
  tanggal_pendaftaran: Date;
  status: "pending" | "selesai";
}

export interface EditPendaftaranParams {
  token: string;
  id: string;
  user_id: number;
  dokter_id: number;
  ruang_id: number;
  tanggal_pendaftaran: Date;
  status: "pending" | "selesai";
}

export interface ShowPendaftaranParams {
  token: string;
  id: string | undefined;
}

export interface DeletePendaftaranParams {
  token: string;
  id: string;
}

export interface IPendaftaran {
  id: string;
  nama_pasien: string;
  nama_dokter: string;
  nama_ruang: string;
  nomor_identitas: string;
  status: "pending" | "selesai";
  tanggal_pendaftaran: Date;
  user_id: number;
  dokter_id: number;
  ruang_id: number;
}

export interface GetAllRekamMedisParams {
  token: string;
  page?: string;
  orderBy?: string;
  jenis_kelamin?: string;
}

export interface CreateRekamMedisParams {
  token: string;
  pendaftaran_id: number;
  keluhan: string;
  diagnosa: string;
  tindakan: string;

  keterangan: string;
}

export interface EditRekamMedisParams {
  token: string;
  id: string;
  pendaftaran_id: number;
  keluhan: string;
  diagnosa: string;
  tindakan: string;

  keterangan: string;
}

export interface ShowRekamMedisParams {
  token: string;
  id: string | undefined;
}

export interface DeleteRekamMedisParams {
  token: string;
  id: string;
}

export interface IRekamMedis {
  id: string;
  pendaftaran_id: number;
  nama_pasien: string;
  nomor_identitas: string;
  keluhan: string;
  diagnosa: string;
  tindakan: string;
  jenis_kelamin: "L" | "P";
  keterangan: string;
}
