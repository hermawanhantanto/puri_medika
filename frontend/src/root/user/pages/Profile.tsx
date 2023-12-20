import ProfileForm from "@/components/form/ProfileForm";
import Spinner from "@/components/shared/Spinner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useGetAllPendaftaranByUser,
  useGetAllRekamMedisByUser,
  useShowPasien,
} from "@/lib/react-query/queriesAndMutation";

interface IPendaftaran {
  id: number;
  tanggal_pendaftaran: string;
  status: string;
  dokter: {
    nama: string;
  };
  ruang: {
    nama: string;
  };
}

interface IRekamMedis {
  id: number;
  keluhan: string;
  diagnosa: string;
  tindakan: string;
  keterangan: string;
}

const Profile = () => {
  const token = JSON.parse(localStorage.getItem("user")!).token;
  const id = JSON.parse(localStorage.getItem("user")!).id;

  const {
    data: pengguna,
    isFetching,
    refetch,
  } = useShowPasien({
    id: String(id),
    token,
  });

  const { data: pendaftarans } = useGetAllPendaftaranByUser({
    id: String(id),
    token,
  });

  const { data: rekammediss } = useGetAllRekamMedisByUser({
    id: String(id),
    token,
  });

  return (
    <main className="flex sm:max-w-[1440px] mx-auto min-h-screen flex-col max-sm:px-5 max-sm:w-full">
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <section className="flex w-full gap-4 sm:my-12 max-sm:flex-col ">
            <img
              src={
                pengguna.data.image
                  ? pengguna.data.image
                  : "https://github.com/shadcn.png"
              }
              alt="profile"
              className="h-32 w-32 rounded-full object-cover "
            />

            <div className="flex sm:justify-between sm:gap-12 max-sm:flex-col max-sm:mb-4">
              <div className="flex flex-col flex-1">
                <h1 className="text-xl font-bold">{pengguna?.data.nama}</h1>
                <p className="text-slate-500 text-sm">{pengguna?.data.email}</p>
                <p className="text-sm font-semibold mt-1 text-blue-500">
                  {pengguna?.data.alamat}
                </p>
              </div>
              <ProfileForm
                id={String(id)}
                token={token}
                nama={pengguna?.data.nama}
                email={pengguna?.data.email}
                nomor_telepon={pengguna?.data.nomor_telepon}
                alamat={pengguna?.data.alamat}
                jenis_kelamin={pengguna?.data.jenis_kelamin}
                tanggal_lahir={new Date(pengguna?.data.tanggal_lahir)}
                nomor_identitas={pengguna?.data.nomor_identitas}
                refetch={refetch}
              />
            </div>
          </section>
          <h1 className="text-xl font-bold mb-4">Riwayat</h1>
          <Tabs defaultValue="pendaftaran" className="w-full">
            <TabsList>
              <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
              <TabsTrigger value="rekammedis">Rekam Medis</TabsTrigger>
            </TabsList>
            <TabsContent value="pendaftaran" className="flex flex-wrap gap-2">
              {pendaftarans?.data.map((pendaftaran: IPendaftaran) => (
                <Card
                  key={pendaftaran.id}
                  className="w-[240px] shadow transition duration-300 transform hover:translate-y-2 cursor-pointer"
                >
                  <CardContent className="p-4 flex flex-col gap-2">
                    <Badge
                      className="text-xs w-fit"
                      variant={
                        pendaftaran.status === "pending"
                          ? "destructive"
                          : "default"
                      }
                    >
                      {pendaftaran.status}
                    </Badge>
                    <CardTitle className="text-sm">
                      {pengguna?.data.nama}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {pendaftaran.tanggal_pendaftaran}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      {pendaftaran.dokter.nama}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      {pendaftaran.ruang.nama}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
            <TabsContent value="rekammedis" className="flex flex-wrap gap-2">
              {rekammediss?.data.map((rekammedis: IRekamMedis) => (
                <Card
                  key={rekammedis.id}
                  className="w-[240px] shadow transition duration-300 transform hover:translate-y-2 cursor-pointer"
                >
                  <CardContent className="p-4 flex flex-col gap-2">
                    <CardTitle className="text-sm">
                      {pengguna?.data.nama}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Keluhan: {rekammedis.keluhan}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      Diagnosa: {rekammedis.diagnosa}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      Tindakan: {rekammedis.tindakan}
                    </CardDescription>
                    <CardDescription className="text-xs">
                      Keterangan: {rekammedis.keterangan}
                    </CardDescription>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </>
      )}
    </main>
  );
};

export default Profile;
