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
import { Link, useLocation } from "react-router-dom";
import NotFound from "../shared/NotFound";
import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import Pagination from "../shared/Pagination";

const PasienAdminTable = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const {
    data: pasiens,
    isFetching,
    refetch,
  } = useGetAllPasien({
    token: user!.token,
    orderBy: params.get("orderBy") || "",
    jenis_kelamin: params.get("jenis_kelamin") || "",
    page: params.get("page") || "",
  });

  const item = pasiens?.total || 0;

  useEffect(() => {
    refetch();
  }, [params.get("jenis_kelamin"), params.get("page"), params.get("orderBy")]);

  const handleOrderBy = (key: string) => {
    params.delete("orderBy");
    params.set("orderBy", key);
    const query = params.size ? "?" + params.toString() : "";
    return `/admin/pasien${query}`;
  };

  const active = params.get("orderBy");
  const page = Number(params.get("page")) || 1;

  const content = () => {
    if (isFetching) return <SkeletonTable />;
    else if (pasiens?.data?.data.length === 0) return <NotFound />;
    else {
      return (
        <>
          <Table className="min-w-full">
            <TableCaption>Pasiens</TableCaption>
            <TableHeader>
              <TableRow className="max-lg:hidden">
                {tableHeaderPasien.map((item) => {
                  return (
                    <TableHead key={item.key}>
                      <Link
                        to={handleOrderBy(item.key)}
                        className="flex items-center gap-2"
                      >
                        {item.label}
                        {active === item.key && <FaArrowUp />}
                      </Link>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pasiens?.data?.data.map((pasien: IPasien) => (
                <TableRow key={pasien.id}>
                  <TableCell>
                    <Link to={`/admin/pasien/edit/${pasien.id}`}>
                      {pasien.nama}
                    </Link>
                  </TableCell>
                  <TableCell>{pasien.email}</TableCell>
                  <TableCell className="max-sm:hidden">
                    {pasien.nomor_identitas}
                  </TableCell>
                  <TableCell className="max-sm:hidden ">
                    {String(pasien.tanggal_lahir)}
                  </TableCell>
                  <TableCell className="max-sm:hidden max-lg:hidden">
                    {pasien.alamat}
                  </TableCell>
                  <TableCell className="max-sm:hidden">
                    {pasien.jenis_kelamin}
                  </TableCell>
                  <TableCell className="max-sm:hidden max-lg:hidden">
                    {pasien.nomor_telepon}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-8 w-full flex justify-center items-center">
            <Pagination currentPage={page} totalCount={item} pageSize={10} />
          </div>
        </>
      );
    }
  };
  return content();
};

export default PasienAdminTable;
