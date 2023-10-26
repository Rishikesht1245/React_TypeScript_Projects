import { Button, Stack } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import SaveIcon from "@mui/icons-material/Save";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
const SymbolButton = ({ text, color, action, width, onClick }: ButtonProps) => {
  return (
    <Stack alignItems={"center"}>
      <Button
        variant="outlined"
        startIcon={
          action === "save" ? (
            <CloudUploadIcon />
          ) : action === "passwords" ? (
            <SaveIcon />
          ) : (
            <ExitToAppIcon />
          )
        }
        onClick={onClick}
        sx={{ backgroundColor: `${color}`, width: `${width}` }}
      >
        {text}
      </Button>
    </Stack>
  );
};
export default SymbolButton;
