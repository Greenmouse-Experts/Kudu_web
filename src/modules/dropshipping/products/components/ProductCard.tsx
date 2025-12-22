interface AliProduct {
  originalPrice: string;
  originalPriceCurrency: string;
  salePrice: string;
  discount: string;
  itemMainPic: string;
  title: string;
  type: string;
  score: string;
  itemId: string;
  targetSalePrice: string;
  targetOriginalPriceCurrency: string;
  evaluateRate: string;
  orders: string;
  targetOriginalPrice: string;
  itemUrl: string;
  salePriceCurrency: string;
}

export default function AliProductCard({ item }: { item: AliProduct }) {
  return (
    <div className="card bg-base-100 shadow-xl">
      <figure>
        <img
          src={item.itemMainPic}
          alt={item.title}
          className="rounded-xl object-cover h-48 w-full"
        />
      </figure>
      <div className="card-body p-4">
        <h2 className="card-title line-clamp-1 text-lg font-semibold">
          {item.title}
        </h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              Price: {item.salePrice} {item.salePriceCurrency}
            </p>
            <p className="text-xs line-through text-gray-500">
              Original: {item.originalPrice} {item.originalPriceCurrency}
            </p>
          </div>
          <div className="badge badge-secondary">{item.discount}</div>
        </div>

        <div className="card-actions justify-end mt-4">
          <a href={item.itemUrl} className="btn btn-primary btn-sm">
            View Product
          </a>
        </div>
      </div>
    </div>
  );
}
