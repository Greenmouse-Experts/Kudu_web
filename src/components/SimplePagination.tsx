import { Minus, Plus } from "lucide-react";

export const SimplePagination = ({
  paginate,
  total,
}: {
  paginate: any;
  total: number;
}) => {
  return (
    <div className="flex items-center gap-2  py-2 justify-center mb-2">
      <button
        onClick={paginate.prevPage}
        className="btn btn-square btn-primary btn-sm"
      >
        <Minus />
      </button>
      <>{paginate.params.page}</>
      <button
        onClick={() => paginate.nextPage(total)}
        className="btn btn-square btn-primary btn-sm"
      >
        <Plus />
      </button>
    </div>
  );
};
