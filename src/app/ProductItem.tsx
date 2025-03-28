const ProductItem = (item: ProductProps) => {
  const { desc, id, imgs, name, price, quan } = item;

  return (
    <div className=" border-2 border-border flex flex-col rounded gap-y-2  ">
      <div>
        <img src={imgs[0]} alt="" className="w-full h-80 object-cover" />
      </div>
      <div className="p-2.5">
        <div>
          <p>{name}</p>
          <p>{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
