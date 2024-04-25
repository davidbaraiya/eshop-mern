import "./admin.css";
import Sidebar from "./Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import { DataGrid } from "@mui/x-data-grid";
import toast from "react-hot-toast";
import {
  deleteUsersAction,
  getAllUsersAction,
} from "../redux/actions/userAction";
import Loader from "../components/Loader";
import { DELETE_USERS_RESET } from "../redux/contants/userConstant";

const UsersList = () => {
  const dispatch = useDispatch();
  const { allUsersLoading, allUsersError, allUsers } = useSelector(
    (state) => state.adminUser.allUsers
  );

  const { deleteUserError, deleteUserStatus, deleteUserLoading } = useSelector(
    (state) => state.adminUser.deleteUser
  );

  useEffect(() => {
    dispatch(getAllUsersAction());
    if (deleteUserStatus) {
      toast.success("user deleted successfully");
      dispatch({ type: DELETE_USERS_RESET });
    }
  }, [deleteUserStatus, dispatch]);

  const columns = [
    { field: "id", headerName: "User ID", minWidth: 100, flex: 1 },
    {
      field: "name",
      headerName: "Name",
      minWidth: 80,
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 120,
      flex: 0.8,
    },
    {
      field: "role",
      headerName: "Role",
      minWidth: 60,
      flex: 0.5,
      cellClassName: (params) => {
        return (
          (params.value === "admin" ? "text-purple-700 font-bold" : "") +
          " capitalize "
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      type: "number",
      minWidth: 100,
      flex: 0.4,
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Link to={`/admin/user/edit/${params.id}`}>
              <IconButton aria-label="action">
                <EditIcon className="text-blue-700" />
              </IconButton>
            </Link>
            <IconButton
              disabled={deleteUserLoading}
              aria-label="action"
              onClick={() => dispatch(deleteUsersAction(params.id))}
            >
              <DeleteIcon className="text-red" />
            </IconButton>
          </>
        );
      },
    },
  ];

  const rows = [];

  allUsers &&
    allUsers.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        email: item.email,
        role: item.role,
      });
    });

  if (allUsersLoading || deleteUserLoading) {
    return <Loader />;
  }

  if (deleteUserError) {
    toast.error(deleteUserError);
    dispatch({ type: DELETE_USERS_RESET });
  }

  return (
    <section className="admin-dashboard ">
      <div className="admin-orders-view">
        <div className="flex gap-5 items-start">
          <Sidebar />
          <div className="main-dashbord">
            <h3 className="mb-5">Orders</h3>
            <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              pageSizeOptions={[5]}
              disableSelectionOnClick
              className="myUsersTable"
              autoHeight
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UsersList;
