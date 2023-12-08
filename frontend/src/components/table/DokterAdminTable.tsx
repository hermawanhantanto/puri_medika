import { tableHeaderDokter } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllDokter } from "@/lib/react-query/queriesAndMutation";
import { IDokter } from "@/types";
import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import NotFound from "../shared/NotFound";
import Pagination from "../shared/Pagination";
import SkeletonTable from "../shared/SkeletonTable";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const DokterAdminTable = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const {
    data: dokters,
    isFetching,
    refetch,
  } = useGetAllDokter({
    token: user!.token,
    orderBy: params.get("orderBy") || "",
    jenis_kelamin: params.get("jenis_kelamin") || "",
    page: params.get("page") || "",
  });

  const item = dokters?.total || 0;

  useEffect(() => {
    refetch();
  }, [params.get("jenis_kelamin"), params.get("page"), params.get("orderBy")]);

  const handleOrderBy = (key: string) => {
    params.delete("orderBy");
    params.set("orderBy", key);
    const query = params.size ? "?" + params.toString() : "";
    return `/admin/dokter${query}`;
  };

  const active = params.get("orderBy");
  const page = Number(params.get("page")) || 1;

  const content = () => {
    if (isFetching) return <SkeletonTable />;
    else if (dokters?.data?.data.length === 0) return <NotFound />;
    else {
      return (
        <>
          <Table className="min-w-full">
            <TableCaption>Dokters</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHeaderDokter.map((item) => {
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
              {dokters?.data?.data.map((dokter: IDokter) => (
                <TableRow key={dokter.id}>
                  <TableCell>
                    <Link to={`/admin/dokter/edit/${dokter.id}`}>
                      {dokter.nama}
                    </Link>
                  </TableCell>
                  <TableCell>{dokter.spesialis}</TableCell>
                  <TableCell>{dokter.nomor_izin_praktek}</TableCell>
                  <TableCell>{dokter.alamat}</TableCell>
                  <TableCell>{dokter.jenis_kelamin}</TableCell>
                  <TableCell>{dokter.no_telp}</TableCell>
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

export default DokterAdminTable;
