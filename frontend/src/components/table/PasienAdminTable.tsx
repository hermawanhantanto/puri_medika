import { useAuth } from "@/hooks/useAuth";
import { useGetAllPasien } from "@/lib/react-query/queriesAndMutation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { tableHeaderPasien } from "@/constant";
import { IPasien } from "@/types";
import SkeletonTable from "../shared/SkeletonTable";
import { Link } from "react-router-dom";

const PasienAdminTable = () => {
  const { user } = useAuth();
  const { data: pasiens, isLoading } = useGetAllPasien(user!.token);
  console.log(pasiens);

  const content = () => {
    if (isLoading) return <SkeletonTable />;
    else {
      return (
        <Table className="min-w-full">
          <TableCaption>Pasiens</TableCaption>
          <TableHeader>
            <TableRow>
              {tableHeaderPasien.map((item) => (
                <TableHead key={item.key}>{item.label}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {pasiens?.data.map((pasien: IPasien) => (
              <TableRow key={pasien.id}>
                <TableCell>
                  <Link to={`/admin/pasien/edit/${pasien.id}`}>
                    {pasien.nama}
                  </Link>
                </TableCell>
                <TableCell>{pasien.email}</TableCell>
                <TableCell>{pasien.nomor_identitas}</TableCell>
                <TableCell>{String(pasien.tanggal_lahir)}</TableCell>
                <TableCell>{pasien.alamat}</TableCell>
                <TableCell>{pasien.jenis_kelamin}</TableCell>
                <TableCell>{pasien.nomor_telepon}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };
  return content();
};

export default PasienAdminTable;
