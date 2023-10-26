import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Typography, Stack } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import toast from "react-hot-toast";
import { deletePassword } from "../models/deletePassword";
import ShowConfirm from "./UI/ShowConfirm";

export default function PasswordTable({
  pending,
  passwords,
  getAllPasswords,
}: PasswordTableProps) {
  //   function to delete data
  const handleDelete = async (id: string): Promise<void> => {
    await deletePassword(id);
    await getAllPasswords();
  };

  return pending ? (
    <Typography variant="h5" textAlign={"center"} color={"white"}>
      Fetching Passwords...
    </Typography>
  ) : (
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "16px", textAlign: "center" }}
            >
              Name
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "16px", textAlign: "center" }}
            >
              Password
            </TableCell>
            <TableCell
              sx={{ fontWeight: "bold", fontSize: "16px", textAlign: "center" }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passwords.map((password) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={password.id}>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {password.name}
                </TableCell>
                <TableCell sx={{ color: "white", textAlign: "center" }}>
                  {password.password}
                </TableCell>
                <TableCell>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <ShowConfirm
                      message={`Are you sure to delete ${password.name} ?`}
                      handleFunction={handleDelete}
                      params={password.id}
                    >
                      <IconButton>
                        <DeleteIcon sx={{ color: "orangered" }} />
                      </IconButton>
                    </ShowConfirm>
                    <IconButton
                      onClick={() => {
                        navigator.clipboard.writeText(password.password);
                        toast.success("Password copied to clipboard");
                      }}
                    >
                      <FileCopyIcon color="primary" />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
