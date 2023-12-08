import { useAuth } from "@/hooks/useAuth";
import { useShowDokter } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";
import DokterForm from "../form/DokterForm";
import SkeletonTable from "./SkeletonTable";

const DokterEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: dokter, isFetching } = useShowDokter({
    id,
    token: user!.token,
  });

  if (isFetching)
    return (
      <div className="mt-12">
        <SkeletonTable />;
      </div>
    );
  return <DokterForm dokter={dokter?.data} />;
};

export default DokterEdit;
