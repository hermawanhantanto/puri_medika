import PasienAdminTable from "@/components/table/PasienAdminTable";
import { Link } from "react-router-dom";

const PasienAdminPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Link
        to="/admin/pasien/create"
        className="self-end mb-8 py-2 px-4 bg-blue-500 text-white rounded"
      >
        Tambah Pasien
      </Link>

      <PasienAdminTable />
    </div>
  );
};

export default PasienAdminPage;
