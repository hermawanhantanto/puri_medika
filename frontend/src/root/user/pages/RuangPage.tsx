import Spinner from "@/components/shared/Spinner";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllRuang } from "@/lib/react-query/queriesAndMutation";
import { IRuang } from "@/types";

const RuangPage = () => {
  const { user } = useAuth();
  const token = JSON.parse(localStorage.getItem("user")!).token;
  const { data: ruangs } = useGetAllRuang({ token });
  if (!user) return <Spinner />;
  return (
    <main className="flex w-full flex-col min-h-screen">
      <section className="flex flex-col xl:p-36 lg:p-24 gap-2 max-sm:min-h-[300px] bg-[url('assets/images/ruang1.jpg')] bg-cover bg-no-repeat xl:min-h-[550px] bg-center sm:py-24 sm:px-12 p-5 object-cover">
        <h1 className="xl:text-3xl lg:text-xl text-xs text-blue-600 font-bold max-sm:hidden">
          Ruang Perawatan
        </h1>
        <p className="xl:max-w-[400px] lg:max-w-[300px] max-w-[200px] lg:text-sm xl:text-lg text-xs text-slate-600 font-semibold max-sm:hidden">
          Puri medika selalu memastikan ruang perawatan yang nyaman dan bersih
        </p>
      </section>
      <section className="sm:mt-12 p-12">
        <h1 className="text-center sm:text-3xl font-bold text-xl">
          Ruang <span className="text-[#50D890]">Perawatan</span>
        </h1>
        <div className="mt-12 grid sm:gap-6 gap-2 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
          {ruangs?.data.data.map((ruang: IRuang) => (
            <Card
              key={ruang.id}
              className="transition duration-300 tranform hover:-translate-y-3 cursor-pointer"
            >
              <CardHeader>
                <img
                  src={ruang.gambar}
                  alt="ruang"
                  className="object-cover sm:h-[220px] max-sm:h-[180px] rounded"
                />
              </CardHeader>
              <CardContent className="flex-col gap-4 flex">
                <CardTitle className="max-sm:text-lg">{ruang.nama}</CardTitle>
                <CardDescription className="max-sm:text-sm">
                  {ruang.keterangan}
                </CardDescription>
                <div className="flex justify-between items-center">
                  {ruang.status === "tersedia" ? (
                    <Badge
                      variant="default"
                      className="w-fit flex items-center justify-center py-1 px-2"
                    >
                      {ruang.status}
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="w-fit">
                      {ruang.status}
                    </Badge>
                  )}
                  <span className="max-sm:hidden text-sm text-slate-600 font-semibold">
                    Kapasitas {ruang.kapasitas} pasien
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
};

export default RuangPage;
