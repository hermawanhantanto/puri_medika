import ProfileForm from "@/components/form/ProfileForm";
import Spinner from "@/components/shared/Spinner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/useAuth";
import { useShowPasien } from "@/lib/react-query/queriesAndMutation";

const Profile = () => {
  const { user } = useAuth();
  const { data: pengguna, isFetching, refetch } = useShowPasien({
    token: user!.token,
    id: String(user!.id),
  });

  return (
    <main className="flex max-w-[1440px] mx-auto min-h-screen flex-col">
      {isFetching ? (
        <Spinner />
      ) : (
        <>
          <section className="flex w-full gap-4 my-12 ">
            <img
              src={
                pengguna.data.image
                  ? pengguna.data.image
                  : "https://github.com/shadcn.png"
              }
              alt="profile"
              className="h-32 w-32 rounded-full object-cover"
            />

            <div className="flex justify-between gap-12">
              <div className="flex flex-col flex-1">
                <h1 className="text-xl font-bold">{pengguna?.data.nama}</h1>
                <p className="text-slate-500 text-sm">{pengguna?.data.email}</p>
                <p className="text-sm font-semibold mt-1 text-blue-500">
                  {pengguna?.data.alamat}
                </p>
              </div>
              <ProfileForm
                id={String(user!.id)}
                token={user!.token}
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
          <Tabs defaultValue="pendaftaran" className="w-[400px]">
            <TabsList>
              <TabsTrigger value="pendaftaran">Pendaftaran</TabsTrigger>
              <TabsTrigger value="rekammedis">Rekam Medis</TabsTrigger>
            </TabsList>
            <TabsContent value="pendaftaran">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="rekammedis">
              Change your password here.
            </TabsContent>
          </Tabs>
        </>
      )}
    </main>
  );
};

export default Profile;
