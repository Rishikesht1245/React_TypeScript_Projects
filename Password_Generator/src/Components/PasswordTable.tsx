import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import toast from "react-hot-toast";

export default function PasswordTable({
  pending,
  passwords,
  getAllPasswords,
}: PasswordTableProps) {
  //   function to delete data
  const handleDelete = (id: string): void => {
    console.log(id);
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
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Name
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Password
            </TableCell>
            <TableCell sx={{ fontWeight: "bold", fontSize: "16px" }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {passwords.map((password) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={password.id}>
                <TableCell sx={{ color: "white" }}>{password.name}</TableCell>
                <TableCell sx={{ color: "white" }}>
                  {password.password}
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDelete(password.id)}>
                    <DeleteIcon sx={{ color: "orangered" }} />
                  </IconButton>
                  <IconButton
                    onClick={() => {
                      navigator.clipboard.writeText(password.password);
                      toast.success("Password copied to clipboard");
                    }}
                  >
                    <FileCopyIcon color="primary" />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
