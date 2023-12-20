import { tableHeaderRuang } from "@/constant";
import { useAuth } from "@/hooks/useAuth";
import { useGetAllRuang } from "@/lib/react-query/queriesAndMutation";
import { IRuang } from "@/types";
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
import { Badge } from "../ui/badge";

const RuangAdminTable = () => {
  const { user } = useAuth();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const {
    data: ruangs,
    isFetching,
    refetch,
  } = useGetAllRuang({
    token: user!.token,
    orderBy: params.get("orderBy") || "",
    status: params.get("status") || "",
    page: params.get("page") || "",
  });

  const item = ruangs?.total || 0;

  useEffect(() => {
    refetch();
  }, [params.get("status"), params.get("page"), params.get("orderBy")]);

  const handleOrderBy = (key: string) => {
    params.delete("orderBy");
    params.set("orderBy", key);
    const query = params.size ? "?" + params.toString() : "";
    return `/admin/ruang${query}`;
  };

  const active = params.get("orderBy");
  const page = Number(params.get("page")) || 1;

  const content = () => {
    if (isFetching) return <SkeletonTable />;
    else if (ruangs?.data?.data.length === 0) return <NotFound />;
    else {
      return (
        <>
          <Table className="min-w-full">
            <TableCaption>Ruangs</TableCaption>
            <TableHeader>
              <TableRow className="max-sm:hidden">
                {tableHeaderRuang.map((item) => {
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
              {ruangs?.data?.data.map((ruang: IRuang) => (
                <TableRow key={ruang.id}>
                  <TableCell>
                    <Link to={`/admin/ruang/edit/${ruang.id}`}>
                      {ruang.nama}
                    </Link>
                  </TableCell>
                  <TableCell className="max-sm:hidden">
                    {ruang.keterangan}
                  </TableCell>
                  <TableCell>
                    {ruang.status === "tersedia" ? (
                      <Badge>{ruang.status}</Badge>
                    ) : (
                      <Badge variant="destructive">{ruang.status}</Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-sm:hidden">
                    {ruang.kapasitas} Orang
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

export default RuangAdminTable;
