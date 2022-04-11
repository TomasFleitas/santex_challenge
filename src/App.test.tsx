import { MockedProvider } from '@apollo/client/testing';
import { act, render } from '@testing-library/react';
import {
  ADDED_PRODUCT,
  CLEAR_CART,
  REMOVED_PRODUCT,
  RESPONSE_DATA,
} from 'assets/mock';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { ContractProvider } from 'Context/CartProvider';
import { ADD_TO_CART, REMOVE_ALL, REMOVE_TO_CART } from 'graphql/mutations';
import { GET_PRODUCTS } from 'graphql/queries';
import { ProductList } from './components/ProductList';

/* Algunos tests */

const wait = async (time: number = 1) =>
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, time));
  });

const mocks = [
  {
    request: {
      query: GET_PRODUCTS,
      variables: {},
    },
    result: RESPONSE_DATA,
  },
  {
    request: {
      query: ADD_TO_CART,
      variables: { productVariantId: '1', quantity: 1 },
    },
    result: ADDED_PRODUCT,
  },
  {
    request: {
      query: REMOVE_TO_CART,
      variables: { orderLineId: '12' },
    },
    result: REMOVED_PRODUCT,
  },
  {
    request: {
      query: REMOVE_ALL,
      variables: {},
    },
    result: CLEAR_CART,
  },
];

describe('Santex ProductList - Tests', () => {
  const { getByTestId } = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <ContractProvider>
        <Header />
        <Footer />
      </ContractProvider>
    </MockedProvider>
  );

  const header = getByTestId('header');
  const footer = getByTestId('footer');

  //HEADER

  it('Render header', async () => {
    expect(header).toBeTruthy();
  });

  it('Render header - img', async () => {
    expect(header.querySelector('img')).toBeTruthy();
  });

  it('Link header - img - src (imagen logo santex)', async () => {
    expect(header.querySelector('img')?.src).toBe(
      'https://santex.wpengine.com/wp-content/uploads/2019/02/logo-santex@3x.png'
    );
  });

  it('Header - div - total price', async () => {
    expect(header.children[1].children[1].children[0].textContent).toBe(
      ' $0.00'
    );
  });

  //FOOTER

  it('Render footer', async () => {
    expect(footer).toBeTruthy();
  });

  it('Render footer - a (elemento <a>)', async () => {
    expect(footer.querySelector('a')).toBeTruthy();
  });

  it('Link footer - a - href (url a perfil de Developer)', async () => {
    expect(footer.querySelector('a')?.href).toBe(
      'https://www.linkedin.com/in/tomasfleitas/'
    );
  });

  //PRODUCT LIST
  it('Render grid', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    await wait(); // wait for response

    const grid = getByTestId('grid');

    expect(grid).toBeTruthy();
  });

  //PRODUCTS
  it('Product show', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ProductList />
      </MockedProvider>
    );

    await wait(); // wait for response

    const grid = getByTestId('grid');

    expect(grid.children.length > 0).toBeTruthy();
  });

  it('Add one Product to cart', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContractProvider>
          <Header />
          <ProductList />
        </ContractProvider>
      </MockedProvider>
    );

    await wait(1); // wait for response

    const grid = getByTestId('grid');
    const head = getByTestId('header');

    (grid.children[0].lastChild?.lastChild as any).click();

    await wait(10); // wait for adding product

    expect(
      !!head.children[1].children[1].children[0].textContent?.match(
        /USD \$129,900.00/
      )?.length
    ).toBeTruthy();
  });

  it('Remove one line of product to cart', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContractProvider>
          <Header />
          <ProductList />
        </ContractProvider>
      </MockedProvider>
    );

    await wait(1); // wait for response

    const grid = getByTestId('grid');
    const head = getByTestId('header');

    (grid.children[0].lastChild?.lastChild as any).click();
    await wait(10); // wait for adding product
    (grid.children[0]?.lastChild?.firstChild as any).click();
    await wait(10); // wait for removing product

    expect(
      head?.children[1]?.children[1]?.children[0]?.textContent?.match(/0.00/)
    ).toBeTruthy();
  });

  it('Clear cart', async () => {
    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <ContractProvider>
          <Header />
          <ProductList />
        </ContractProvider>
      </MockedProvider>
    );

    await wait(1); // wait for response

    const grid = getByTestId('grid');
    const head = getByTestId('header');

    (grid.children[0].lastChild?.lastChild as any).click();
    await wait(10); // wait for adding product
    ((head.children[1]?.lastChild as any).children?.[0] as any).click();
    await wait(10); // wait for clean cart
    expect(
      head.children[1].children[1].children[0].textContent?.match(/0.00/)
    ).toBeTruthy();
  });
});
