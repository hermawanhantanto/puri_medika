import { useAuth } from "@/hooks/useAuth";
import { useShowPasien } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";
import PasienForm from "../form/PasienForm";
import SkeletonTable from "./SkeletonTable";

const PasienEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: pasien, isFetching } = useShowPasien({
    id,
    token: user!.token,
  });

  if (isFetching)
    return (
      <div className="mt-12">
        <SkeletonTable />;
      </div>
    );
  return <PasienForm pasien={pasien?.data} />;
};

export default PasienEdit;
