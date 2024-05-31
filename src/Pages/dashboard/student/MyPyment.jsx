import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import UseFetch from "../../../hooks/UseFetch";
import UseSecurity from "../../../hooks/UseSecurity";
import UseUser from "../../../hooks/UseUser";

const MyPayment = () => {
  const axiosFetch = UseFetch();
  const axiosSecure = UseSecurity();
  const { currentUser, isLoading } = UseUser();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayments, setPaginatedPayments] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 4;

  const totalItem = payments.length;
  const totalPage = Math.ceil(totalItem / itemsPerPage);

  useEffect(() => {
    const lastIndex = page * itemsPerPage;
    const firstIndex = lastIndex - itemsPerPage;
    const currentItems = payments.slice(firstIndex, lastIndex);
    setPaginatedPayments(currentItems);
  }, [page, payments]);

  useEffect(() => {
    axiosFetch
      .get(`/api/payment-history/${currentUser?.email}`)
      .then((res) => {
        setPayments(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentUser?.email]);

  const totalPaidAmount = payments.reduce((amt, cur) => amt + cur.amount, 0);

  if (loading) {
    return (
      <div className="flex justify-center items-center align-middle h-screen">
        <ScaleLoader
          color="#f7a5b9"
          height={60}
          margin={3}
          radius={3}
          width={5}
        />
      </div>
    );
  }

  // for pagination
  const handlePageChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const renderPagination = () => {
    const pages = [];
    for (let i = 1; i <= totalPage; i++) {
      pages.push(
        <li key={i} className={`mx-1 ${page === i ? "font-bold" : ""}`}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-2 border border-gray-300 rounded ${
              page === i ? "bg-blue-500 text-white" : "text-gray-700"
            } hover:bg-blue-500 hover:text-white transition-colors`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <div>
      <div className="text-center mt-6 mb-16">
        <p className="text-gray-400">
          Hey{" "}
          <span className="text-secondary font-bold">{currentUser?.name}</span>
        </p>
        <h1 className="text-4xl font-bold">
          Welc<span className="text-primary">ome</span> to your Pay
          <span className="text-primary">ment </span>
          History
        </h1>
        <p className="text-gray-500 text-sm my-3">
          You can see your payment history here
        </p>
      </div>

      {/* Table start from here */}
      <div>
        <div className="flex justify-between">
          <p className="font-bold">Total Payment: {payments.length}</p>
          <p className="font-bold">Total Paid: {totalPaidAmount}/-</p>
        </div>

        <div className="flex justify-center min-h-screen">
          <div className="w-full mx-auto bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    #
                  </th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total Item
                  </th>
                  <th className="py-2 px-4 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedPayments.map((payment, indx) => (
                  <tr className="border-t border-gray-200" key={indx}>
                    <td className="py-2 px-4">
                      {(page - 1) * itemsPerPage + indx + 1}
                    </td>
                    <td className="py-2 px-4">
                      {"\u20B9 "}
                      {payment.amount}
                    </td>
                    <td className="py-2 px-4">{payment.classesId.length}</td>
                    <td className="py-2 px-4">{payment.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-center p-4 bg-white">
              <ul className="flex list-none">{renderPagination()}</ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPayment;
