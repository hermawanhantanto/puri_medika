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
