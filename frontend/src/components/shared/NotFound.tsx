import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center items-center flex-col gap-4">
      <img
        src="/assets/images/not_found.png"
        alt="404"
        width={570}
        className="object-contain"
      />
      <h1 className="text-3xl font-semibold text-blue-500">No Results</h1>
      <p className="text-lg text-slate-400">
        Saat ini data masih kosong. Tunggu beberapa saat lagi.
      </p>
      <Link
        className="px-4 py-2 text-white bg-blue-600 rounded"
        to={"/admin/dashboard"}
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
