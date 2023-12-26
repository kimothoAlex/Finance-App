import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { MdDashboardCustomize } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { FaCreditCard } from "react-icons/fa";
const SideBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="flex h-screen">
      <aside className="bg-blue-600   border rounded-lg m-3 p-3  text-white w-80 gap-8  hidden sm:block">
        <div className="p-4 h-full   ">
          <div className="flex flex-col  justify-between items-center ">
            <img
              className="w-20 m-4 shadow-xl object-cover h-20 self-center rounded-full"
              src={currentUser.avatar}
              alt="User avatar"
            />
            <div className="flex flex-col items-center mb-4 gap-1">
              <h2 className="text-xl font-bold ">
                {currentUser.username[0].toUpperCase() +
                  currentUser.username.slice(1)}
              </h2>
              <p className="font-bold">Your Finances</p>
            </div>
          </div>

          <ul className="flex flex-col justify-between items-center">
            <Link to={"/"}>
              <li className="py-2 px-6 hover:bg-blue-700 flex items-center gap-2 rounded-lg hover:shadow-lg">
                {<MdDashboardCustomize />} <span>Home</span>
              </li>
            </Link>
            <Link>
              <li className="py-2 px-6 flex items-center gap-2  hover:bg-blue-700 rounded-lg hover:shadow-lg">
                {<FaMoneyBillTrendUp />} <span>Incomes</span>
              </li>
            </Link>
            <Link>
              <li className="py-2 px-6 flex items-center gap-2  hover:bg-blue-700 rounded-lg hover:shadow-lg">
                {<FaMoneyBillTransfer />}
                <span>Expenses</span>
              </li>
            </Link>
            <Link>
              <li className="py-2 px-6 flex items-center gap-2  hover:bg-blue-700 rounded-lg hover:shadow-lg">
                {<FaCreditCard />} <span>Transactions</span>
              </li>
            </Link>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SideBar;
