import CardDashboard from "@/components/shared/CardDashboard";
import { FaUserInjured } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { FaFileWaveform } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";
import { useAuth } from "@/hooks/useAuth";
import {
  useCountDokter,
  useCountPasien,
  useCountPendaftaran,
  useCountRekamMedis,
  useCountRuang,
  useGetRecentPasien,
} from "@/lib/react-query/queriesAndMutation";
import DashboardChart from "@/components/shared/DashboardChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IPasien } from "@/types";
import SkeletonCustom from "@/components/shared/SkeletonCustom";

const DashboardAdminPage = () => {
  const { user } = useAuth();
  const { data: countPasien, isFetching: isCountPasien } = useCountPasien(
    user!.token
  );
  const { data: countDokter, isFetching: isCountDokter } = useCountDokter(
    user!.token
  );
  const { data: countRuang, isFetching: isCountRuang } = useCountRuang(
    user!.token
  );
  const { data: countPendaftaran, isFetching: isCountPendaftaran } =
    useCountPendaftaran(user!.token);
  const { data: countRekamMedis, isFetching: isCountRekamMedis } =
    useCountRekamMedis(user!.token);
  const { data: recentPasien, isFetching: isRecentPasien } = useGetRecentPasien(
    user!.token
  );

  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center flex-wrap lg:gap-8 gap-4">
        <CardDashboard
          title="Pasien"
          jumlah={countPasien?.data}
          isLoading={isCountPasien}
        >
          <FaUserInjured className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard
          title="Dokter"
          jumlah={countDokter?.data}
          isLoading={isCountDokter}
        >
          <FaUserMd className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard
          title="Ruang"
          jumlah={countRuang?.data}
          isLoading={isCountRuang}
        >
          <MdBedroomChild className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard
          title="Pendaftaran"
          jumlah={countPendaftaran?.data}
          isLoading={isCountPendaftaran}
        >
          <SiGoogleforms className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard
          title="Rekam Medis"
          jumlah={countRekamMedis?.data}
          isLoading={isCountRekamMedis}
        >
          <FaFileWaveform className="text-sm text-blue-500" />
        </CardDashboard>
      </div>
      <div className="flex w-full mt-12 gap-4 max-lg:flex-col">
        <DashboardChart
          pasien={countPasien?.data}
          dokter={countDokter?.data}
          ruang={countRuang?.data}
          pendaftaran={countPendaftaran?.data}
          rekam_medis={countRekamMedis?.data}
        />
        <Card className="lg:w-[600px] w-full max-sm:max-w-[300px]">
          <CardHeader>
            <CardTitle>Pasien Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {isRecentPasien ? (
              <SkeletonCustom />
            ) : (
              <div className="flex flex-col gap-8 mt-4">
                {recentPasien?.data.map((pasien: IPasien) => {
                  return (
                    <div className="flex items-center gap-2">
                      {pasien.image ? (
                        <Avatar>
                          <AvatarImage src={pasien.image} alt="profil" />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                      ) : (
                        <Avatar>
                          <AvatarImage
                            src="https://github.com/shadcn.png"
                            alt="profil"
                          />
                          <AvatarFallback>?</AvatarFallback>
                        </Avatar>
                      )}
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm">{pasien.nama}</p>
                        <p className="text-xs text-slate-500">{pasien.email}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
