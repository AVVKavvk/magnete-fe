import useStore from "../store/useStore";

const Pagination = ({ total }) => {
  const { page, setPage, limit } = useStore();
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => setPage(Math.max(page - 1, 1))}
        className="btn btn-sm"
        disabled={page === 1}
      >
        Prev
      </button>
      <span className="mx-4">
        Page {page} of {totalPages}
      </span>
      <button
        onClick={() => setPage(Math.min(page + 1, totalPages))}
        className="btn btn-sm"
        disabled={page === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
