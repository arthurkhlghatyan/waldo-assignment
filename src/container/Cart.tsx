import useCart from '../state/useCart';
import { XIcon } from '@heroicons/react/solid';

function Cart() {
  const { items, remove } = useCart(({ items, remove }) => ({
    items,
    remove,
  }));

  return (
    <ul>
      {items.map(({ size, total, toppings, id }) => (
        <li key={id} className="py-6">
          <div className="flex-1 flex flex-col justify-between">
            <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="text-lg">
                    <span className="capitalize font-medium text-gray-700 hover:text-gray-800">
                      {size}
                    </span>
                  </h3>
                </div>
                <p className="mt-1 text-md font-medium text-gray-900">
                  ${total.toFixed(2)}
                </p>
              </div>

              <div className="mt-4 sm:mt-0 sm:pr-9">
                <div className="absolute top-0 right-0">
                  <button
                    type="button"
                    className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Remove</span>
                    <XIcon
                      onClick={() => remove(id)}
                      className="h-5 w-5"
                      aria-hidden="true"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <ul>
            {toppings.map((topping) => {
              return (
                <li className="w-full border-b py-4 capitalize" key={topping}>
                  {topping}
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
}

export default Cart;
