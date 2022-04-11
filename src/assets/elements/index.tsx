import { Spin } from 'antd';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import './index.scss';

/* Diferentes styled componentes creados para la app */

/* 
  min 1
  max 5
  según resolución de screen
 */
const COLUMNS_NUMBER = 5;

type props = {
  color?: string;
  background?: string;
  outline?: boolean;
  justifyContent?: string;
};

export const Grid = styled.div`
  width: 100%;
  height: 100%;
  columns: ${COLUMNS_NUMBER};
  column-gap: 10px;
  padding: 0px 10px;
`;
export const GirdElement = styled.div`
  display: inline-block;
  padding: 1rem;
  margin: 5px 0px;
  border: 1px solid #ccc;
  box-shadow: 3px 3px 15px #ccc;
`;

const InnerButton = styled.button`
  display: flex;
  background: #fff;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 0.25rem;
  cursor: pointer;
  align-items: center;
  justify-content: space-around;
  min-width: 100px;
  color: ${(props: props) => props.color || '#000'};
  background: ${(props: props) => props.background || 'transparent'};
  &:hover {
    opacity: 0.8;
  }

  font-weight: 600;
  position: relative;
  overflow: hidden;
  svg {
    fill: ${(props: props) =>
      props.outline ? 'var(--secondary-color)' : props.color || 'white'};
    heght: 20px;
    width: 20px;
  }
`;

function createRipple(event: any) {
  const button = event.currentTarget;
  const circle = document.createElement('span');

  const diameter = Math.max(button.clientWidth, button.clientHeight);
  const radius = diameter / 2;

  circle.style.width = circle.style.height = `${diameter}px`;
  circle.style.left = `${event.clientX - (button.offsetLeft + radius)}px`;
  circle.style.top = `${event.clientY - (button.offsetTop + radius)}px`;
  circle.classList.add('ripple');

  const ripple = button.getElementsByClassName('ripple')[0];

  if (ripple) {
    ripple.remove();
  }

  button.appendChild(circle);
}

const buttons: any = document.getElementsByTagName('button');

for (const button of buttons) {
  button.addEventListener('click', createRipple);
}

export const Button = ({ loading, children, onClick, ...props }: any) => {
  return (
    <InnerButton
      disabled={loading}
      onClick={(e) => !loading && onClick && onClick(e)}
      {...props}
    >
      {loading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
      ) : (
        children
      )}
    </InnerButton>
  );
};

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: ${(props: props) => props.justifyContent || 'space-between'};
  align-items: center;
`;

export const TextTypewriter = styled.p`
  font-family: 'Courier New', Courier, monospace;
  position: relative;

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

  &::before {
    background: var(--background-color);
    animation: typewriter 1.5s steps(21) forwards;
  }

  &::after {
    width: 0.123em;
    background: black;
    animation: typewriter 1.5s steps(21) forwards,
      blink 500ms steps(21) infinite;
  }

  @keyframes typewriter {
    to {
      left: 100%;
    }
  }

  @keyframes blink {
    to {
      background: transparent;
    }
  }
`;
