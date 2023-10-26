import Button from "@mui/material/Button";
const Buttons = ({ text, width, color }: ButtonProps) => {
  return (
    <Button
      className="generate-btn"
      variant="outlined"
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
