import { Link } from "react-router-dom";
export default function DropshipHeader() {
  return (
    <div className="h-14 border-b border-current/20 px-4 flex items-center">
      <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
        Open drawer
      </label>
      <Link to="/admin/dashboard" className="ml-auto btn btn-primary">
        Dashboard
      </Link>
    </div>
  );
}
