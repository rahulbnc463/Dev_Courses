import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import UseSecurity from "../../../hooks/UseSecurity";
import { Pagination } from "@mui/material";
import { ScaleLoader } from "react-spinners";

const ManageClasses = () => {
  const [page, setPage] = useState(1);
  const [classes, setClasses] = useState([]);
  const [paginatedData, setPaginantedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemPerPage = 6;
  const axiosSecure = UseSecurity();
  const axiosFetch = UseFetch();
  const navigate = useNavigate();
  const totalPage = Math.ceil(classes.length / itemPerPage);
  useEffect(() => {
    let lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    if (lastIndex > classes.length) {
      lastIndex = classes.length;
    }
    const currentData = classes.slice(firstIndex, lastIndex);
    setPaginantedData(currentData);
  }, [page, totalPage]);

  useEffect(() => {
    axiosFetch
      .get(`/api/classes/all`)
      .then((res) => {
        setClasses(res.data), setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleChange = (e, value) => {
    setPage(value);
  };
  const handleApprove = (id) => {
    axiosSecure
      .put(`/api/change-status/${id}`, {
        status: "approved",
        reason: "upgrade",
      })
      .then((res) => {
        setClasses((prevClasses) =>
          prevClasses.map((item) =>
            item._id === id
              ? { ...item, status: "approved", reason: "upgrade" }
              : item
          )
        );
        Swal.fire({
          title: "Approved!",
          text: "Successfully Approved!",
          icon: "success",
        });
        navigate("/dashboard/adminHome", { replace: true });
      })
      .catch((error) => console.log(error));
  };
  const handleReject = (id) => {
    axiosSecure
      .put(`/api/change-status/${id}`, {
        status: "pending",
        reason: "upgrade",
      })
      .then((res) => {
        const updateClass = classes.map((item) =>
          item._id === id
            ? { ...item, status: "pending", reason: "upgrade" }
            : item
        );
        Swal.fire({
          title: "Rejected!",
          text: "Rejected Successfull!",
          icon: "success",
        });
        navigate("/dashboard/adminHome", { replace: true });
        setClasses(updateClass);
      })
      .catch((error) => console.log(error));
  };
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
  return (
    <div>
      <div className="text-center my-4">
        <h1 className="lg:text-4xl">
          Manage All<span className="text-secondary font-bold"> Classes </span>
        </h1>
        <p>You can check all classes here & able to update classes</p>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-6 lg:mx-8">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-left text-sm font-light">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th scope="col" className="px-6 py-4">
                        PHOTO
                      </th>
                      <th scope="col" className="px-6 py-4">
                        COURSE NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        INSTRUCTOR NAME
                      </th>
                      <th scope="col" className="px-6 py-4">
                        STATUS
                      </th>
                      <th scope="col" className="px-6 py-4">
                        DETAILS
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="6"
                          className="text-center font-bold text-2xl"
                        >
                          No Classes Found
                        </td>
                      </tr>
                    ) : (
                      paginatedData.map((item, index) => (
                        <tr
                          key={item._id}
                          className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-500"
                        >
                          <td className="whitespace-nowrap px-6 py-4">
                            <img
                              src={item.image}
                              alt="thumb404"
                              className="w-[45px]"
                            />
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            {item.instructorName}
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <span
                              className={`font-bold px-2 py-1 uppercase text-white rounded-xl ${
                                item.status === "pending"
                                  ? "bg-orange-500"
                                  : item.status === "checking"
                                  ? "bg-yellow-400"
                                  : item.status === "approved"
                                  ? "bg-green-600"
                                  : "bg-red-500"
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <div className="flex gap-2">
                              {
                                <button
                                  onClick={() => handleApprove(item._id)}
                                  className="bg-green-500 disabled:bg-green-700 cursor-pointer text-white px-2 py-2 rounded-md"
                                >
                                  Approve
                                </button>
                              }
                              {
                                <button
                                  disabled={
                                    item.status === "pending" ||
                                    item.status === "checking"
                                  }
                                  onClick={() => handleReject(item._id)}
                                  className="bg-red-600 disabled:bg-red-800 cursor-pointer text-white px-4 py-2 rounded-md"
                                >
                                  Reject
                                </button>
                              }
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* pagination section is here  */}
          <div>
            <div className="w-full h-full flex justify-center items-center my-10">
              <Pagination
                onChange={handleChange}
                count={totalPage}
                shape="rounded"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageClasses;
