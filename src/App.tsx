import styled from 'styled-components';
import { ProductList } from './components/ProductList';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import './App.scss';
import { ContractProvider } from './Context/CartProvider';

const MainContent = styled.div`
  flex: 1;
`;

export const App = () => {
  return (
    <ContractProvider>
      <Header />
      <MainContent>
        <ProductList />
      </MainContent>
      <Footer />
    </ContractProvider>
  );
};
