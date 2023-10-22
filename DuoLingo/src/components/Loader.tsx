import CircularProgress from "@mui/material/CircularProgress";
import { Stack } from "@mui/material";

export default function Loader() {
  return (
    <Stack alignItems={"center"} justifyContent={"center"} height={"100vh"}>
      <CircularProgress />
    </Stack>
  );
}
