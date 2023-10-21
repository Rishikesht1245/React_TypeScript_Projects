import {
  Paper,
  Typography,
  Checkbox,
  Button,
  Stack,
  TextField,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { useState } from "react";

type TodoItemProps = {
  todo: TodoItemType;
  completeHandler: (id: TodoItemType["id"]) => void;
  deleteHandler: (id: TodoItemType["id"]) => void;
  editHandler: (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ) => void;
};

const TodoItem = ({
  todo,
  deleteHandler,
  completeHandler,
  editHandler,
}: TodoItemProps) => {
  const [editActive, setEditActive] = useState<boolean>(false);
  const [editValue, setEditValue] = useState<string>(todo.title);
  return (
    <Paper variant="elevation" elevation={3} sx={{ padding: "1rem" }}>
      <Stack direction={"row"} alignItems={"center"}>
        {editActive ? (
          <TextField
            type={"text"}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                editHandler(todo.id, editValue);
                setEditActive(false);
              }
            }}
          />
        ) : (
          <Typography marginRight={"auto"}>{todo?.title}</Typography>
        )}
        <Checkbox
          onChange={() => completeHandler(todo?.id)}
          checked={todo?.isCompleted}
        />
        <Button onClick={() => deleteHandler(todo?.id)}>
          <Delete />
        </Button>
        <Button
          color="primary"
          onClick={() => {
            if (editActive) {
              editHandler(todo.id, editValue);
            }
            setEditActive((prev) => !prev);
          }}
        >
          {editActive ? "DONE" : "EDIT"}
        </Button>
      </Stack>
    </Paper>
  );
};
export default TodoItem;
