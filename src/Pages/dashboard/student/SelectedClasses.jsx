import { useEffect } from "react";
import moment from "moment";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UseSecurity from "../../../hooks/UseSecurity";
import { ScaleLoader } from "react-spinners";
import UseUser from "../../../hooks/UseUser";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { FaPaypal } from "react-icons/fa";
import Swal from "sweetalert2";

const SelectedClasses = () => {
  const { currentUser, isLoading } = UseUser();
  const [loading, setLoading] = useState(true);
  const [classes, setClasses] = useState([]);
  const [paginatedData, setPaginatedData] = useState([]);
  const [page, setPage] = useState(1);
  const itemPerPage = 5;
  const totalPage = Math.ceil(classes.length / itemPerPage);
  const navigate = useNavigate();
  const axiosSecure = UseSecurity();

  useEffect(() => {
    axiosSecure
      .get(`/api/cart-data/user/${currentUser?.email}`)
      .then((res) => {
        setClasses(res.data);
        setLoading(false);
        // console.log("current:", currentUser?.email);
        // console.log("data:", classes.length);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
      });
  }, []);
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

  // handle Delete function
  const handleDelete = (id) => {
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
          .delete(`/api/cart-data/delete/${id}`)
          .then((res) => {
            // Update state after successful deletion
            setClasses((prevClasses) =>
              prevClasses.filter((item) => item.id !== id)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            navigate("/dashboard/enrolled-class");
          })
          .catch((err) => console.log(err.message));
      }
    });
  };

  const totalPrice = classes.reduce((amt, item) => {
    return amt + parseInt(item.price);
  }, 0);
  const totalTax = totalPrice * 0.01;
  const price = totalPrice + totalTax;

  //handle pay function
  const handlePay = (id) => {
    // console.log(id);
    const item = classes.find((item) => item._id === id);
    const price = item.price;
    // console.log(price);
    navigate("/dashboard/user/payment", {
      state: { price: price, itemId: id },
    });
  };
  return (
    <div>
      <div className="my-6 text-center">
        <h1 className="text-4xl font-bold">
          Selected <span className="text-secondary">Classes</span>
        </h1>
      </div>

      <div className="h-screen py-8">
        <div className="container mx-auto px-4">
          <h2>Shooping Cart</h2>
          <div className="flex flex-col md:flex-row gap-4">
            {/* left div  */}
            <div className="md:w-3/4">
              <div className="bg-white rounded-lg shadow-md p-6 mb-4">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold">#</th>
                      <th className="text-left font-semibold">Product</th>
                      <th className="text-left font-semibold">Price</th>
                      <th className="text-left font-semibold">Date</th>
                      <th className="text-left font-semibold">Action</th>
                    </tr>
                  </thead>

                  {/* table body start here */}
                  <tbody>
                    {classes.length === 0 ? (
                      <tr>
                        <td
                          colSpan="5"
                          className="text-center text-2xl font-bold"
                        >
                          No Class available
                        </td>
                      </tr>
                    ) : (
                      classes.map((item, id) => {
                        const letIdx = (page - 1) * itemPerPage + id + 1;
                        return (
                          <tr key={item._id}>
                            <td className="py4">{letIdx}</td>
                            <td className="py-4">
                              <div className="flex items-center">
                                <img
                                  src={item.image}
                                  alt=""
                                  className="h-13 w-16 mr-4"
                                />
                                <span>{item.name}</span>
                              </div>
                            </td>
                            <td className="py-4">
                              {"\u20B9 "}
                              {item.price}
                            </td>
                            <td className="py-4">
                              <p className="text-blue-700 text-sm">
                                {moment(item.submitted).format("MMMM DD YYYY")}
                              </p>
                            </td>
                            <td className="py-4 flex pt-8 gap-2">
                              <button
                                onClick={() => handleDelete(item._id)}
                                className="px-3 py-1 cursor-pointer bg-red-500 rounded-3xl text-white font-bold"
                              >
                                <MdOutlineRemoveShoppingCart />
                              </button>
                              <button
                                onClick={() => handlePay(item._id)}
                                className="px-3 py-1 cursor-pointer bg-green-500 rounded-3xl text-white font-bold"
                              >
                                <FaPaypal />
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Right div  */}
            <div className="md:w-1/5 fixed right-3">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-lg font-semibold mb-4">Summary</h2>
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>
                    {"\u20B9 "}
                    {totalPrice}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Taxes</span>
                  <span>
                    {"\u20B9 "}
                    {totalTax}
                  </span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Extra charges</span>
                  <span>{"\u20B9 "}0</span>
                </div>
                <hr className="my-2" />

                <div className="flex justify-between mb-2">
                  <span className="font-semibold">Total:</span>
                  <span className="font-semibold">${price.toFixed(2)}</span>
                </div>
                <button
                  disabled={price <= 0}
                  onClick={() =>
                    navigate("/dashboard/user/payment", {
                      state: { price: price, itemId: null },
                    })
                  }
                  className="bg-secondary text-white py-2 px-4 rounded-lg mt-4 w-full hover:font-bold ease-in-out duration-200"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectedClasses;
