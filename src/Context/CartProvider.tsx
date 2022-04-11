import { createContext, useContext } from 'react';
import useMut from '../graphql/mutations';
import { useNotification } from '../hooks/useNotification';
import useStateWithStorage from '../hooks/useStateWithStorage';

type CartContextType = {
  store?: any;
  addProduct: (v: any) => void;
  removeProduct: (v: any) => void;
  removeAll: () => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);
/* Provider para gestionar el store de la app + metodos princiaples del sistema (add, remove, clear)*/

const ContractProvider = ({ children }: any) => {
  const [store, setStore] = useStateWithStorage<any>('santex-ecommerce', {
    cart: { products: {} },
  });

  const { addItemToOrder, removeOrderLine, removeAllOrderLines } = useMut();
  const { openErrorNotification, openSuccessNotification } = useNotification();

  const addProduct = ({ assets, ...data }: any): void => {
    setStore((s: any) => ({ ...s, ['adding-' + data.id]: true }));
    addItemToOrder({ variables: { productVariantId: data.id, quantity: 1 } })
      .then((r: any) => {
        const lineId = r.data.addItemToOrder.lines.find(
          (e: any) => e.productVariant.id === data.id
        )?.id;

        if (!store?.cart?.products) store.cart.products = {};
        const pro = store.cart.products?.[data.id];

        if (pro) {
          store.cart.products[data.id] = {
            value: {
              ...data,
              line: lineId,
            },
            total: pro.total + 1,
          };
        } else {
          store.cart.products[data.id] = {
            value: {
              ...data,
              line: lineId,
            },
            total: 1,
          };
        }

        setStore((s: any) => ({
          ...s,
          cart: {
            total: r.data.addItemToOrder.total,
            currencyCode: r?.data?.addItemToOrder?.currencyCode,
            products: store.cart.products,
          },
          ['adding-' + data.id]: false,
        }));

        openSuccessNotification(`Producto ${data.name} agregado al carrito`);
      })
      .catch((e) => {
        console.error(e);
        setStore((s: any) => ({ ...s, ['adding-' + data.id]: false }));
        openErrorNotification(e.message);
      });
  };

  const removeProduct = ({ assets, ...data }: any) => {
    if (!data.line) return;
    setStore((s: any) => ({ ...s, ['deleting-' + data.id]: true }));
    removeOrderLine({ variables: { orderLineId: data.line } })
      .then((r) => {
        delete store.cart.products?.[data.id];

        setStore((s: any) => ({
          ...s,
          cart: {
            total: r?.data?.removeOrderLine?.total || 0,
            currencyCode: r?.data?.removeOrderLine?.currencyCode || '',
            products: store.cart.products,
          },
          ['deleting-' + data.id]: false,
        }));

        openSuccessNotification(`Producto ${data.name} eliminado del carrito`);
      })
      .catch((e) => {
        console.error(e);
        setStore((s: any) => ({ ...s, ['deleting-' + data.id]: false }));
        openErrorNotification(e.message);
      });
  };

  const removeAll = () => {
    setStore((s: any) => ({ ...s, ['deleting-all']: true }));
    removeAllOrderLines()
      .then((r) => {
        setStore((s: any) => ({
          ...s,
          cart: {
            total: 0,
            currencyCode: '',
            products: {},
          },
          ['deleting-all']: false,
        }));

        openSuccessNotification('Todos los productos eliminados del carrito');
      })
      .catch((e) => {
        console.error(e);
        setStore((s: any) => ({ ...s, ['deleting-all']: false }));
        openErrorNotification(e.message);
      });
  };

  return (
    <CartContext.Provider
      value={{ store, addProduct, removeProduct, removeAll }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useStore = () => useContext(CartContext);

export { ContractProvider, useStore };
