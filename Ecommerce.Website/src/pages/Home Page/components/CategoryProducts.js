import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { getProductAPI } from "api";
import ProductCard from "components/ProductCard";
import qs from "qs";

const CategoryProducts = ({ data, loadAble, handleFinish }) => {
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProductsData = async () => {
      try {
        const queryString = qs.stringify({
          c: data.slug,
          p: 0,
          l: 5,
        });
        const result = await getProductAPI(`?${queryString}`);
        if (result.data) {
          setProducts(result.data);
        }
      } catch (error) {
        console.log(error);
      }
      handleFinish();
    };

    if (data?.slug && !products && loadAble) {
      getProductsData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadAble]);

  if (!data || !products) return null;

  return (
    <div className="my-[100px] py-5 border-t">
      <div className="flex items-center">
        <div className="text-2xl font-bold text-gray-700 flex-1">
          {data.name}
        </div>
        <Link
          to={`/category/${data.slug}`}
          className="text-orange-600 hover:text-orange-700 font-semibold flex items-center"
        >
          See all products <KeyboardArrowRightIcon />
        </Link>
      </div>
      {Array.isArray(products) &&
        (products.length > 0 ? (
          <div className="flex items-center mt-8 pb-8">
            {products.map((item, index) => (
              <ProductCard
                data={item}
                key={index}
                className={`mr-8 shrink-0`}
              />
            ))}
          </div>
        ) : (
          <div className="mt-8 text-center font-semibold text-gray-700 text-xl">
            No products available for this category yet!
          </div>
        ))}
    </div>
  );
};

export default CategoryProducts;
