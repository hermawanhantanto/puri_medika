import RekamMedisTable from "@/components/table/RekammedisAdminTable";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link, useLocation, useNavigate } from "react-router-dom";

const RekamMedisAdminPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const navigate = useNavigate();

  const handleChange = (values: string) => {
    if (values === "all") {
      params.delete("jenis_kelamin");
      const query = params.size ? "?" + params.toString() : "";
      navigate(`/admin/rekammedis${query}`);
    } else {
      params.set("jenis_kelamin", values);
      const query = params.size ? "?" + params.toString() : "";
      navigate(`/admin/rekammedis${query}`);
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
          to="/admin/rekammedis/create"
          className="self-end py-2 px-4 bg-blue-500 text-white rounded"
        >
          Tambah Rekam Medis
        </Link>
      </div>

      <RekamMedisTable />
    </div>
  );
};

export default RekamMedisAdminPage;
