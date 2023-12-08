import { useAuth } from "@/hooks/useAuth";
import { useShowRekamMedis } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";
import RekamMedisForm from "../form/RekamMedisForm";
import SkeletonTable from "./SkeletonTable";

const RekamMedisEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: rekammedis, isFetching } = useShowRekamMedis({
    id,
    token: user!.token,
  });

  if (isFetching)
    return (
      <div className="mt-12">
        <SkeletonTable />;
      </div>
    );
  return <RekamMedisForm rekammedis={rekammedis?.data} />;
};

export default RekamMedisEdit;
