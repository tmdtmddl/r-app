import { products } from "../utils/dummy";
import ProductItem from "./productItem";

const Home = () => {
  return (
    <div>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-2.5 gap-y-2.5 p-2.5 ">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
};

export default Home;
