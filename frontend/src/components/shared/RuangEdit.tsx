import { useAuth } from "@/hooks/useAuth";
import { useShowRuang } from "@/lib/react-query/queriesAndMutation";
import { useParams } from "react-router-dom";
import RuangForm from "../form/RuangForm";
import SkeletonTable from "./SkeletonTable";

const RuangEdit = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const { data: ruang, isFetching } = useShowRuang({
    id,
    token: user!.token,
  });

  if (isFetching)
    return (
      <div className="mt-12">
        <SkeletonTable />;
      </div>
    );
  return <RuangForm ruang={ruang?.data} />;
};

export default RuangEdit;
