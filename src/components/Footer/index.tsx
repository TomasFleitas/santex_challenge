import style from './index.module.scss';

/* Pie de página */
export const Footer = () => {
  return (
    <div data-testid="footer" className={style.footer}>
      <a href="https://www.linkedin.com/in/tomasfleitas/" target="_blank">
        Developer Fleitas Tomás @ 2022
      </a>
    </div>
  );
};
