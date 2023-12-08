import { tableHeaderPendaftaran } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import {
    useGetAllPendaftaran
} from "@/lib/react-query/queriesAndMutation";
import { IPendaftaran } from "@/types";
import { useEffect } from "react";
import { FaArrowUp } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import NotFound from "../shared/NotFound";
import Pagination from "../shared/Pagination";
import SkeletonTable from "../shared/SkeletonTable";
import { Badge } from "../ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table";

const PendaftaranAdminTable = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const {
    data: pendaftarans,
    isFetching,
    refetch,
  } = useGetAllPendaftaran({
    token: user!.token,
    orderBy: params.get("orderBy") || "",
    status: params.get("status") || "",
    page: params.get("page") || "",
  });

  const item = pendaftarans?.total || 0;

  useEffect(() => {
    refetch();
  }, [params.get("status"), params.get("page"), params.get("orderBy")]);

  const handleOrderBy = (key: string) => {
    params.delete("orderBy");
    params.set("orderBy", key);
    const query = params.size ? "?" + params.toString() : "";
    return `/admin/pendaftaran${query}`;
  };

  const active = params.get("orderBy");
  const page = Number(params.get("page")) || 1;

  const content = () => {
    if (isFetching) return <SkeletonTable />;
    else if (pendaftarans?.data?.data.length === 0) return <NotFound />;
    else {
      return (
        <>
          <Table className="min-w-full">
            <TableCaption>Pendaftaran</TableCaption>
            <TableHeader>
              <TableRow>
                {tableHeaderPendaftaran.map((item) => {
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
              {pendaftarans?.data?.data.map((pendaftaran: IPendaftaran) => (
                <TableRow key={pendaftaran.id}>
                  <TableCell>
                    <Link to={`/admin/pendaftaran/edit/${pendaftaran.id}`}>
                      {pendaftaran.nama_pasien}
                    </Link>
                  </TableCell>
                  <TableCell>{pendaftaran.nama_dokter}</TableCell>
                  <TableCell>{pendaftaran.nama_ruang}</TableCell>
                  <TableCell>{pendaftaran.nomor_identitas}</TableCell>
                  <TableCell>
                    {pendaftaran.status === "selesai" ? (
                      <Badge variant="default">{pendaftaran.status}</Badge>
                    ) : (
                      <Badge variant="destructive">{pendaftaran.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    {String(pendaftaran.tanggal_pendaftaran)}
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

export default PendaftaranAdminTable;
