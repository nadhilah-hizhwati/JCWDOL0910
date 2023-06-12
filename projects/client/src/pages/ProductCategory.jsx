import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useNavigation } from "react-router-dom";
import { getAllProductCategories } from "../features/ProductCategoriesSlice";

function ProductCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [limit, setLimit] = useState(5);
  const [offset, setOffset] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const productList = useSelector((state) => state.products.productList);

  const handleNext = () => {
    setPage(page + 1);
    setOffset(offset + 10);
  };
  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
      setOffset(offset - 10);
    }
  };

  const renderProductList = () => {
    const thisProduct = productList.data;
    return thisProduct?.map((product) => {
      return (
        <div
          className={`card bg-white w-[250px] h-[350px] m-2 rounded-lg shadow-lg `}
        >
          <div className="top">
            <img
              className="w-[250px] h-[200px] object-cover  p-2"
              src={product.image_url}
              alt="img"
            />
          </div>
          <div className="bottom flex flex-col justify-center items-start p-3 bg-">
            <div className="title font-semibold text-xs my-1">
              {product.name}
            </div>
            <div className="category text-xs font-light my-1">
              {product.description}
            </div>

            <div className="pricing flex items-center">
              <div className="price ">{product.price}</div>
            </div>
            <div className="flex items-center my-2">
              <button
                className="border px-3 py-1 text-xs rounded-lg mr-1 "
                onClick={() => navigate("/product/" + product.id_product)}
              >
                See Detail
              </button>
              <button className="border px-3 py-1 text-xs rounded-lg ">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      );
    });
  };

  useEffect(() => {
    getAllProductCategories();
  }, []);

  return (
    <div>
      <div className="text-center p-4 text-2xl font-bold">Our Product</div>
      <div className=" bg-slate-200 flex flex-col items-center justify-center m-10 p-4 rounded gap-2">
        <div className="flex flex-wrap  justify-center ">
          {renderProductList()}
        </div>
        <div className="flex gap-3">
          <button
            className={`btn btn-outline ${
              page <= productList.totalPages ? "" : "hidden"
            }`}
            onClick={handlePrevious}
          >
            Previous
          </button>

          <button
            className={`btn btn-outline ${
              page === productList.totalPages ? "hidden" : ""
            }`}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCategory;
