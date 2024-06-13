import classes from "./Button.module.css";
const Button = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void | undefined;
}) => {
  return (
    <button onClick={onClick ? onClick : () => {}} className={classes.btn}>
      {children}
    </button>
  );
};

export default Button;
