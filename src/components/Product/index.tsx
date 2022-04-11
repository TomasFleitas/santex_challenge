import { Image } from 'antd';
import { useState } from 'react';
import { PlusSquareOutlined } from '@ant-design/icons';
import { useStore } from '../../Context/CartProvider';
import { Button, ButtonsContainer, GirdElement } from 'assets/elements';
import { LottieT } from 'components/Lottie';
import { formatPrice } from 'components/Header';

export type ProductData = {
  assets: { source: string; __typename: string }[];
  variants: { price: number; currencyCode: string }[];
  description: string;
  id: string;
  slug: string;
  name: string;
  __typename: string;
};

/* Componente Producto */
export const Product = ({ data }: { data: ProductData }) => {
  const [visible, setVisible] = useState<any>();
  const { addProduct, removeProduct, store } = useStore();

  return (
    <GirdElement>
      <Image
        preview={{ visible: false }}
        src={data.assets?.[0].source}
        onClick={() => setVisible(true)}
      />
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup
          preview={{
            visible: visible,
            onVisibleChange: setVisible,
          }}
        >
          {data.assets?.map((inner: any) => (
            <Image key={inner.source} src={inner.source} />
          ))}
        </Image.PreviewGroup>
      </div>
      <img />
      <h2>{data.name}</h2>
      <h4>
        {data.variants[0].currencyCode}{' '}
        {formatPrice(data.variants[0]?.price || 0)}
      </h4>
      <p>{data.description}</p>
      <ButtonsContainer
        justifyContent={
          store?.cart?.products[data.id]?.total > 0 ? 'space-between' : 'end'
        }
      >
        {store?.cart?.products[data.id]?.total > 0 && (
          <Button
            outline
            background={'var(--background-color)'}
            loading={store?.['deleting-' + data.id]}
            onClick={() =>
              removeProduct({
                ...data,
                line: store?.cart.products[data.id]?.value?.line,
              })
            }
          >
            <LottieT />
          </Button>
        )}
        <Button
          loading={store?.['adding-' + data.id]}
          onClick={() => addProduct(data)}
          color="white"
          background="var(--secondary-color)"
        >
          <span style={{ marginRight: '5px' }}>
            {store?.cart.products[data.id]?.total || ''}
          </span>
          <span style={{ marginRight: '5px' }}>
            {`${
              store?.cart.products[data.id]?.total > 0 ? 'AGREGADOS' : 'AGREGAR'
            }`}
          </span>
          <PlusSquareOutlined />
        </Button>
      </ButtonsContainer>
    </GirdElement>
  );
};
