import "./admin.css";
import Sidebar from "./Sidebar";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { getAllOrders } from "../redux/actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";
import { getAdminProducts } from "../redux/actions/productAction";
import { getAllUsersAction } from "../redux/actions/userAction";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Dashboard = () => {
  const dispatch = useDispatch();
  const { allOrders, totalAmount, allOrderLoading, allOrderError } =
    useSelector((state) => state.adminOrders.allOrders);
  const { adminProductsLoading, adminProductsError, adminProducts } =
    useSelector((state) => state.adminProduct.allProducts);

  const { allUsers } = useSelector((state) => state.adminUser.allUsers);

  let outOfStock = 0;
  adminProducts &&
    adminProducts.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(getAdminProducts());
    dispatch(getAllUsersAction());
  }, [dispatch]);

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["green"],
        hoverBackgroundColor: ["#183A40"],
        data: [0, 25000, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, adminProducts?.length - outOfStock],
      },
    ],
  };

  if (allOrderLoading) {
    return <Loader />;
  }
  if (allOrderError) {
    return toast.error(allOrderError);
  }

  return (
    <section className="admin-dashboard">
      <div className="flex gap-5 items-start">
        <Sidebar />
        <div className="main-dashbord  ">
          <h3 className="mb-5">Dashboard</h3>
          <div className="bg-theme  p-3 flex justify-center gap-2">
            <span>Total Amount:</span>
            <span> ₹{totalAmount}</span>
          </div>
          <div className="flex justify-center gap-5 my-12">
            <div className="w-[100px] h-[100px]  bg-theme flex-col rounded-full flex items-center justify-center text-[16px]">
              Products
              <div>{adminProducts?.length}</div>
            </div>
            <div className="w-[100px] h-[100px]  bg-theme flex-col rounded-full flex items-center justify-center text-[16px]">
              orders
              <div>{allOrders?.length}</div>
            </div>
            <div className="w-[100px] h-[100px]  bg-theme flex-col rounded-full flex items-center justify-center text-[16px]">
              Users
              <div>{allUsers?.length}</div>
            </div>
          </div>
          <div className="flex gap-5 my-5">
            <div className="shadow-lg border border-darkGray p-3 w-[60%] flex-1 flex items-center justify-center">
              <Line datasetIdKey="id" data={lineState} />
            </div>
            <div className="shadow-lg border border-darkGray p-3 w-[30%] flex items-center justify-center">
              <Doughnut datasetIdKey="id" data={doughnutState} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
