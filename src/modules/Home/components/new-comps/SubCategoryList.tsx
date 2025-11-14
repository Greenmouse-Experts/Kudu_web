import { useSearchParams } from "react-router-dom";

export default function SubCategoryList({ data }: { data: any[] }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedSubCategory = searchParams.get("subCategory");

  const handleSelectSubCategory = (categoryName: string) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("subCategory", categoryName);
    setSearchParams(newSearchParams);
  };

  return (
    <div className="flex-1 m-2">
      <ul className="menu  rounded-md  w-full">
        {data
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((category) => (
            <li key={category.id}>
              <a
                onClick={() => handleSelectSubCategory(category.name)}
                className={
                  selectedSubCategory === category.name ? "active" : ""
                }
              >
                {category.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}
