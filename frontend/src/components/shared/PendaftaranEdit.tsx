import { useAuth } from "@/hooks/useAuth";
import { useShowPendaftaran } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";
import PendaftaranForm from "../form/PendaftaranForm";
import SkeletonTable from "./SkeletonTable";

const PendaftaranEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: pendaftaran, isFetching } = useShowPendaftaran({
    id,
    token: user!.token,
  });

  if (isFetching)
    return (
      <div className="mt-12">
        <SkeletonTable />;
      </div>
    );
  return <PendaftaranForm pendaftaran={pendaftaran?.data} />;
};

export default PendaftaranEdit;
