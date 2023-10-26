import Button from "@mui/material/Button";
const Buttons = ({ text, width, color, onClick }: ButtonProps) => {
  return (
    <Button
      className="generate-btn"
      variant="outlined"
      onClick={onClick}
      sx={{
        backgroundColor: `${color}`,
        color: "white",
        width: `${width}`,
      }}
    >
      <span>{text}</span>
    </Button>
  );
};
export default Buttons;
