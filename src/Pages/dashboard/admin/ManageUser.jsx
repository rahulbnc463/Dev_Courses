import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseFetch from "../../../hooks/UseFetch";
import UseSecurity from "../../../hooks/UseSecurity";
import { GrUpdate } from "react-icons/gr";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";

import { ScaleLoader } from "react-spinners";

const ManageUser = () => {
  const axiosFetch = UseFetch();
  const navigate = useNavigate();
  const axiosSecure = UseSecurity();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axiosFetch
      .get(`/api/users`)
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleRemove = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/api/delete-user/${id}`)
          .then((res) => {
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            // Update the state to remove the deleted user
            setUsers((prevUsers) =>
              prevUsers.filter((user) => user._id !== id)
            );
          })
          .catch((error) => {
            console.log(error);
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the user.",
              icon: "error",
            });
          });
      }
    });
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
          Manage All<span className="text-secondary font-bold"> Users </span>
        </h1>
        <p>You can check all Users from here & able to update their status</p>
      </div>

      {/* Main section start from here  */}
      <div>
        <div className="flex flex-col">
          <div className="lg:mx-8 overflow-x-auto sm:mx-6">
            <div className="py-2 min-w-full inline-block lg:px-8 sm:px-6">
              <div className="overflow-hidden">
                <table className="min-w-full font-light text-sm text-left">
                  <thead className="border-b font-medium dark:border-neutral-500">
                    <tr>
                      <th className="px-6 py-4" scope="col">
                        #
                      </th>
                      <th className="px-6 py-4" scope="col">
                        PHOTO
                      </th>
                      <th className="px-6 py-4" scope="col">
                        NAME
                      </th>
                      <th className="px-6 py-4 uppercase" scope="col">
                        Role
                      </th>
                      <th className="px-6 py-4 uppercase" scope="col">
                        Update
                      </th>
                      <th className="px-6 py-4 uppercase" scope="col">
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user, index) => (
                      <tr
                        key={user._id}
                        className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                      >
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {index + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <img
                            src={user.image}
                            className="h-[35px] w-[35px]"
                            alt=""
                          />
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {user.name}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {user.role}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <span
                            onClick={() =>
                              navigate(`/dashboard/api/update-user/${user._id}`)
                            }
                            className="items-center gap-2 cursor-pointer bg-green-500 inline-flex px-2 py-2 rounded-md text-white"
                          >
                            {" "}
                            <GrUpdate />
                            Update
                          </span>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          <span
                            onClick={() => handleRemove(user._id)}
                            className="items-center gap-2 cursor-pointer bg-red-500 inline-flex px-2 py-2 rounded-md text-white"
                          >
                            <MdDeleteForever />
                            Remove
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUser;
