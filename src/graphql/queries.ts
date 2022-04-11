import { gql, useQuery } from '@apollo/client';
import { useNotification } from 'hooks/useNotification';
import { useEffect } from 'react';


/* Query para obtener todos los productos */
export const GET_PRODUCTS = gql`
  {
    products {
      items {
        id
        name
        slug
        description
        variants {
          price
          currencyCode
        }
        assets {
          source
        }
      }
    }
  }
`;

/* useQuery para realizar queries con Apollo client */
const useQue = () => {
  const { loading, error, data } = useQuery(GET_PRODUCTS);
  const { openErrorNotification } = useNotification();

  useEffect(() => {
    if (!error) return;
    openErrorNotification(error.message);
  }, [error])


  return {
    loading, error, data: data?.products?.items || []
  }
}

export default useQue