import useSelectItem, { useSingleSelect } from "../../helpers/selectors";
import AliCategories from "./products/components/AliCategories";

export default function DropShippingProducts() {
  const props = useSingleSelect<number>();
  return (
    <div data-theme="kudu">
      <div className="h-14 border-b border-b-current/20"></div>
      <section className="flex">
        <div className="flex-1 max-w-2xs">
          <AliCategories selectProps={props} />
        </div>
        <div></div>
      </section>
    </div>
  );
}
