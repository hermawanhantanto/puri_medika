import { tableHeaderRekamMedis } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllRekamMedis } from "@/lib/react-query/queriesAndMutation";
import { IRekamMedis } from "@/types";
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

const RekamMedisTable = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const {
    data: rekammedis,
    isFetching,
    refetch,
  } = useGetAllRekamMedis({
    token: user!.token,
    orderBy: params.get("orderBy") || "",
    jenis_kelamin: params.get("jenis_kelamin") || "",
    page: params.get("page") || "",
  });

  const item = rekammedis?.total || 0;

  useEffect(() => {
    refetch();
  }, [params.get("jenis_kelamin"), params.get("page"), params.get("orderBy")]);

  const handleOrderBy = (key: string) => {
    params.delete("orderBy");
    params.set("orderBy", key);
    const query = params.size ? "?" + params.toString() : "";
    return `/admin/rekammedis${query}`;
  };

  const active = params.get("orderBy");
  const page = Number(params.get("page")) || 1;

  const content = () => {
    if (isFetching) return <SkeletonTable />;
    else if (rekammedis?.data?.data.length === 0) return <NotFound />;
    else {
      return (
        <>
          <Table className="min-w-full">
            <TableCaption>Rekam Medis</TableCaption>
            <TableHeader>
              <TableRow className="max-lg:hidden">
                {tableHeaderRekamMedis.map((item) => {
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
              {rekammedis?.data?.data.map((rekammedis: IRekamMedis) => (
                <TableRow key={rekammedis.id}>
                  <TableCell>
                    <Link to={`/admin/rekammedis/edit/${rekammedis.id}`}>
                      {rekammedis.nama_pasien}
                    </Link>
                  </TableCell>
                  <TableCell className="max-sm:hidden max-lg:hidden">
                    {rekammedis.nomor_identitas}
                  </TableCell>
                  <TableCell className="max-sm:hidden">
                    {rekammedis.keluhan}
                  </TableCell>
                  <TableCell>{rekammedis.diagnosa}</TableCell>
                  <TableCell className="max-sm:hidden max-lg:hidden">
                    {rekammedis.tindakan}
                  </TableCell>
                  <TableCell className="max-sm:hidden max-lg:hidden">
                    {rekammedis.keterangan}
                  </TableCell>
                  <TableCell className="max-sm:hidden">
                    {rekammedis.jenis_kelamin}
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

export default RekamMedisTable;
