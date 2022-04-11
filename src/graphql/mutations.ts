import { gql, useMutation } from "@apollo/client";

/* Fragmento de la orden activa */
const ORDER_FRAGMENT = gql`
fragment ActiveOrder on Order {
  id
  code
  state
  total
  currencyCode
  lines {
    id
    productVariant {
      id
      name
      currencyCode
    }
    unitPriceWithTax
    unitPrice
    quantity
    featuredAsset {
      id
      preview
    }
  }
}
`;

/* Generalización para usar en todas las mutations */
const GET_ACTIVE_ORDER = gql`
{
  activeOrder {
    ...ActiveOrder
  }
}
${ORDER_FRAGMENT}
`;

/* Mutation para agregar un producto al carrito */
export const ADD_TO_CART = gql`
mutation AddItemToOrder($productVariantId: ID!, $quantity: Int!) {
  addItemToOrder(productVariantId: $productVariantId, quantity: $quantity) {
    ...ActiveOrder
  }
}
${ORDER_FRAGMENT}
`;

/* Mutation para eliminar todos los productos de 1 clase del carrito  */
export const REMOVE_TO_CART = gql`
mutation RemoveOrderLine($orderLineId: ID!) {
  removeOrderLine(orderLineId: $orderLineId) {
    ...ActiveOrder
  }
}
${ORDER_FRAGMENT}
`;

/* Mutation para eliminar todos los productos del carrito */
export const REMOVE_ALL = gql`
mutation RemoveAllOrderLines {
  removeAllOrderLines {
    ...ActiveOrder
  }
}
${ORDER_FRAGMENT}
`;

const _readQuery = (cache: any) => {
  return cache.readQuery({
    query: GET_ACTIVE_ORDER,
  });
}

const _writeQuery = (cache: any, mutationResult: any, method: string) => {
  return cache.writeQuery({
    query: GET_ACTIVE_ORDER,
    data: {
      activeOrder: mutationResult.data[method],
    },
  });
}


/* useMutation para realizar mutaciones con Apollo Client */
const useMut = () => {
  const [addItemToOrder] = useMutation(ADD_TO_CART, {
    update: (cache, mutationResult) => {
      _readQuery(cache);
      _writeQuery(cache, mutationResult, "addItemToOrder");
    },
  });

  const [removeOrderLine] = useMutation(REMOVE_TO_CART, {
    update: (cache, mutationResult) => {
      _readQuery(cache);
      _writeQuery(cache, mutationResult, "removeOrderLine");
    }
  });


  const [removeAllOrderLines] = useMutation(REMOVE_ALL, {
    update: (cache, mutationResult) => {
      _readQuery(cache);
      _writeQuery(cache, mutationResult, "removeAllOrderLines");
    },
  });

  return { addItemToOrder, removeOrderLine, removeAllOrderLines }
}

export default useMut