import CardDashboard from "@/components/shared/CardDashboard";
import { FaUserInjured } from "react-icons/fa";
import { FaUserMd } from "react-icons/fa";
import { MdBedroomChild } from "react-icons/md";
import { FaFileWaveform } from "react-icons/fa6";
import { SiGoogleforms } from "react-icons/si";

const DashboardAdminPage = () => {
  return (
    <div className="flex flex-col w-full">
      <div className="flex items-center justify-evenly">
        <CardDashboard title="Pasien" jumlah={20}>
          <FaUserInjured className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard title="Dokter" jumlah={20}>
          <FaUserMd className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard title="Ruang" jumlah={20}>
          <MdBedroomChild className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard title="Pendaftaran" jumlah={20}>
          <SiGoogleforms className="text-sm text-blue-500" />
        </CardDashboard>
        <CardDashboard title="Rekam Medis" jumlah={20}>
          <FaFileWaveform className="text-sm text-blue-500" />
        </CardDashboard>
      </div>
    </div>
  );
};

export default DashboardAdminPage;
