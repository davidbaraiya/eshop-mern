const Heading = ({ children, className = "" }) => {
  return (
    <div className={`${className} mb-[30px] heading-text`}>{children}</div>
  );
};

export default Heading;
