export default function Hero ({ children, hero }) {
  // renders hero component with any children
  return <header className={hero}>{children}</header>;
};

Hero.defaultProps = {
  hero: "default-hero"
};