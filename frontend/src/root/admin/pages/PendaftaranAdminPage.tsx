import PendaftaranAdminTable from "@/components/table/PendaftaranAdminTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation, useNavigate } from "react-router-dom";

const PendaftaranAdminPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleChange = (values: string) => {
    if (values === "all") {
      params.delete("status");
      const query = params.size ? "?" + params.toString() : "";
      navigate(`/admin/pendaftaran${query}`);
    } else {
      params.set("status", values);
      const query = params.size ? "?" + params.toString() : "";
      navigate(`/admin/pendaftaran${query}`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="items-center flex justify-between mb-8">
        <Select onValueChange={(values) => handleChange(values)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="selesai">Selesai</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Link
          to="/admin/pendaftaran/create"
          className="self-end py-2 px-4 bg-blue-500 text-white rounded"
        >
          Tambah Pendaftaran
        </Link>
      </div>

      <PendaftaranAdminTable />
    </div>
  );
};

export default PendaftaranAdminPage;
