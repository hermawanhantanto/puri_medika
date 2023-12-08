import DokterAdminTable from "@/components/table/DokterAdminTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation, useNavigate } from "react-router-dom";

const DokterAdminPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleChange = (values: string) => {
    if (values === "all") {
      params.delete("jenis_kelamin");
      const query = params.size ? "?" + params.toString() : "";
      navigate(`/admin/dokter${query}`);
    } else {
      params.set("jenis_kelamin", values);
      const query = params.size ? "?" + params.toString() : "";
      navigate(`/admin/dokter${query}`);
    }
  };

  return (
    <div className="flex flex-col w-full">
      <div className="items-center flex justify-between mb-8">
        <Select onValueChange={(values) => handleChange(values)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Jenis Kelamin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="L">Laki-laki</SelectItem>
            <SelectItem value="P">Perempuan</SelectItem>
          </SelectContent>
        </Select>
        <Link
          to="/admin/dokter/create"
          className="self-end py-2 px-4 bg-blue-500 text-white rounded"
        >
          Tambah Dokter
        </Link>
      </div>

      <DokterAdminTable />
    </div>
  );
};

export default DokterAdminPage;
