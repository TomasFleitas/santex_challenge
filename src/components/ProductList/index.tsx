import { CSSProperties } from 'react';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useQue from '../../graphql/queries';
import { Grid, TextTypewriter } from 'assets/elements';
import { Product, ProductData } from 'components/Product';

const spinerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  height: '100%',
  alignItems: 'center',
};

/* Componente padre de la "grilla" de Productos */
export const ProductList = () => {
  const { data, loading } = useQue();

  if (loading)
    return (
      <div data-testid="loading" style={spinerStyle}>
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        <TextTypewriter>Cargando productos...</TextTypewriter>
      </div>
    );

  return (
    <Grid data-testid="grid">
      {data?.map((e: ProductData, i: number) => {
        return <Product key={i} data={e} />;
      })}
    </Grid>
  );
};
