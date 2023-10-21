import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Stack,
  TextField,
  Button,
} from "@mui/material";
import TodoItem from "./components/TodoItem";
import { useEffect, useState } from "react";
import { getTodos, saveLocal } from "./utils/features";

function App() {
  const [todos, setTodos] = useState<TodoItemType[]>(getTodos());

  const [title, setTitle] = useState<TodoItemType["title"]>("");

  useEffect(() => {
    saveLocal(todos);
  }, [todos]);

  // making todo complete
  const completeHandler = (id: TodoItemType["id"]): void => {
    const updatedTodos = todos.map((item) => {
      //not returning from the if case just updating the isCompleted
      if (item.id === id) item.isCompleted = !item.isCompleted;
      return item;
    });

    setTodos(updatedTodos);
    // saving in local storage
  };

  // delete todo
  const deleteHandler = (id: TodoItemType["id"]): void => {
    const updatedTodos = todos.filter((item) => item.id !== id);

    setTodos(updatedTodos);
  };

  // submit new todo
  const submitHandler = (): void => {
    const newTodo: TodoItemType = {
      title,
      isCompleted: false,
      id: String(Math.random() * 1000),
    };

    setTodos((prev) => [...prev, newTodo]);
    setTitle("");
  };

  // edit todo
  const editHandler = (
    id: TodoItemType["id"],
    newTitle: TodoItemType["title"]
  ): void => {
    const updatedTodos = todos.map((item) => {
      //not returning from the if case just updating the isCompleted
      if (item.id === id) item.title = newTitle;
      return item;
    });

    setTodos(updatedTodos);
  };

  return (
    // setting the container
    <Container maxWidth="sm" sx={{ height: "100vh" }}>
      {/* Nav bar created using AppBar and ToolBar component from MUI */}
      <AppBar position="static">
        <Toolbar>
          {/* Typography Used for creating texts */}
          <Typography variant="h5" textAlign={"center"}>
            Todo App
          </Typography>
        </Toolbar>
      </AppBar>

      {/* wrapping the todo Items inside a stack (flex) and direction column */}
      <Stack height={"70%"} direction={"column"} spacing={"1rem"} p={"1rem"}>
        {todos.map((item) => (
          <TodoItem
            key={item?.id}
            todo={item}
            deleteHandler={deleteHandler}
            completeHandler={completeHandler}
            editHandler={editHandler}
          />
        ))}
      </Stack>

      {/* Input for adding new todo */}
      <TextField
        fullWidth
        label={"Add Task"}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && title !== "") submitHandler();
        }}
      />
      <Button
        sx={{ margin: "1rem 0", padding: "10px" }}
        fullWidth
        variant="contained"
        onClick={submitHandler}
        disabled={title === ""}
      >
        Add Task
      </Button>
    </Container>
  );
}

export default App;
