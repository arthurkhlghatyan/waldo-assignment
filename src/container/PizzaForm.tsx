import { gql, useQuery } from '@apollo/client';
import { useMemo } from 'react';
import { ChangeEvent, useState } from 'react';
import { PizzaFormQuery } from '../@types/queries';
import useCart from '../state/useCart';
import { v4 as uuidv4 } from 'uuid';
import QueryState from '../component/QueryState';
import { useEffect } from 'react';

const query = gql`
  query PizzaFormQuery {
    pizzaSizes {
      name
      maxToppings
      basePrice
      toppings {
        defaultSelected
        topping {
          name
          price
        }
      }
    }
  }
`;

function PizzaForm() {
  const { loading, error, data } = useQuery<PizzaFormQuery>(query);
  const { addToCart, cartCount } = useCart((state) => ({
    addToCart: state.add,
    cartCount: state.items.length,
  }));

  // State variables. Keep the state bare minimum
  const [size, setSize] = useState('');
  const [toppings, setToppings] = useState<string[]>([]);

  const sizeInstance = data?.pizzaSizes.find(({ name }) => name === size);

  const total = useMemo(() => {
    if (sizeInstance === undefined) {
      return 0;
    }

    return sizeInstance.toppings.reduce(
      (prev, { topping }) =>
        prev + (toppings.includes(topping.name) ? topping.price : 0),
      sizeInstance.basePrice,
    );
  }, [toppings, sizeInstance]);

  useEffect(() => {
    if (sizeInstance === undefined) {
      return;
    }

    setToppings(
      sizeInstance.toppings
        .filter((topping) => topping.defaultSelected)
        .map((topping) => topping.topping.name),
    );
  }, [sizeInstance]);

  const onPizzaSizeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSize(event.target.value);
  };

  const onToppingToggle = (topping: string) => {
    const index = toppings.indexOf(topping);

    if (index === -1) {
      setToppings((prev) => [...prev, topping]);
    } else {
      setToppings((prev) => prev.filter((selected) => selected !== topping));
    }
  };

  const getPrice = (price: number | undefined) => {
    return typeof price !== 'undefined' ? `$${price.toFixed(2)}` : '$0';
  };

  const onAddToCart = () => {
    if (total === undefined) {
      return;
    }

    addToCart({
      id: uuidv4(),
      size,
      toppings,
      total: total,
    });
  };

  return (
    <QueryState loading={loading} error={error !== undefined}>
      <div className="">
        <select
          className="w-full my-6 capitalize"
          onChange={onPizzaSizeChange}
          value={size}
        >
          <option>-- Select size --</option>
          {data?.pizzaSizes.map(({ name, basePrice }) => (
            <option value={name} key={name}>
              {name} - {getPrice(basePrice)}
            </option>
          ))}
        </select>

        {size !== '' ? (
          <div className="my-6">
            {sizeInstance?.toppings?.map(({ topping: { name, price } }) => (
              <div className="my-2 flex items-center" key={name}>
                <input
                  id={name}
                  className="mr-4 disabled:bg-gray-300"
                  disabled={
                    sizeInstance.maxToppings !== null &&
                    toppings.length > sizeInstance.maxToppings &&
                    toppings.indexOf(name) === -1
                  }
                  type="checkbox"
                  checked={toppings.indexOf(name) !== -1}
                  onChange={() => onToppingToggle(name)}
                />
                <label
                  htmlFor={name}
                  className="capitalize disabled:color-gray-300 flex justify-between w-full"
                >
                  <span>{name}</span>
                  <span>{getPrice(price)}</span>
                </label>
              </div>
            ))}
          </div>
        ) : null}

        <div>
          <div className="mb-10 text-base font-medium text-gray-900">
            Total: {getPrice(total)}
          </div>
          <div>
            <button
              className="w-full disabled:bg-gray-400 bg-indigo-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500"
              disabled={total === 0 || total === undefined}
              onClick={onAddToCart}
            >
              {cartCount > 0 ? 'Add Another' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </QueryState>
  );
}

export default PizzaForm;
