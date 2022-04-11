import styled from 'styled-components';
import { useStore } from '../../Context/CartProvider';
import { LottieC, LottieD } from 'components/Lottie';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  align-items: center;
  z-index: 5;
  border-radius: 0px 0px 10px 10px;
  position: sticky;
  top: 0;
  background: var(--primary-color);
`;

const Total = styled.div`
  background: #fff;
  padding: 5px 20px;
  font-weight: bold;
  font-size: 1.2rem;
  border-radius: 5px;
  display: flex;
  align-items: center;
  .products {
    font-size: 10px;
  }

  .remove-all {
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
  }
`;

/* Formato de precio */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
};

/* Componente del encabezado de la página */
export const Header = () => {
  const { store, removeAll } = useStore();

  const getTotalProducts = () => {
    return Object.keys(store.cart.products)
      .map((key) => store.cart.products[key])
      .reduce((acc, value) => acc + value.total, 0);
  };

  return (
    <Head data-testid="header">
      <img
        src="https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png"
        alt="logo"
      />
      <Total>
        <LottieC />
        <div>
          <div>
            {`${store?.cart?.currencyCode || ''} ${formatPrice(
              store?.cart?.total || 0
            )}`}
          </div>
          <div className="products">{`Cant. productos: ${getTotalProducts()}`}</div>
        </div>
        {store?.cart?.total > 0 && (
          <div className="remove-all" onClick={() => removeAll()}>
            {store?.['deleting-all'] ? (
              <Spin
                style={{ marginLeft: '15px' }}
                indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />}
              />
            ) : (
              <LottieD />
            )}
          </div>
        )}
      </Total>
    </Head>
  );
};
