import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
  MdOutlineKeyboardDoubleArrowRight,
} from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface Props {
  currentPage: number;
  pageSize: number;
  totalCount: number;
}

const Pagination = ({ currentPage, pageSize, totalCount }: Props) => {
  const pageCount = Math.ceil(totalCount / pageSize);

  const location = useLocation();
  const params = new URLSearchParams(window.location.search);
  const navigate = useNavigate();

  const handleChange = (page: number) => {
    params.set("page", page.toString());
    const query = params.size ? "?" + params.toString() : "";
    navigate(`${location.pathname}${query}`);
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        variant="secondary"
        onClick={() => handleChange(1)}
        disabled={currentPage === 1}
      >
        <MdOutlineKeyboardDoubleArrowLeft />
      </Button>
      <Button
        variant="secondary"
        onClick={() => handleChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <MdOutlineKeyboardArrowLeft />
      </Button>
      <p className="text-slate-600 mx-1">
        {currentPage} of {pageCount}
      </p>
      <Button
        variant="secondary"
        onClick={() => handleChange(currentPage + 1)}
        disabled={currentPage === pageCount}
      >
        <MdOutlineKeyboardArrowRight />
      </Button>
      <Button
        variant="secondary"
        onClick={() => handleChange(pageCount)}
        disabled={currentPage === pageCount}
      >
        <MdOutlineKeyboardDoubleArrowRight />
      </Button>
    </div>
  );
};

export default Pagination;
