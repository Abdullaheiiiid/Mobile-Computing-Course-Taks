import { useFonts } from "expo-font";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

function App() {
  const [task, setTask] = useState("");
  const [taskCounter, setTaskCounter] = useState(0);
  const [finishedTaskCounter, setFinishedTaskCounter] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [loaded] = useFonts({
    Galindo: require("./assets/fonts/Galindo-Regular.ttf"),
  });
  function addTask() {
    if (task.trim() !== "") {
      setTaskCounter((taskCounter) => taskCounter + 1);
      setTasks([
        ...tasks,
        { id: Date.now().toString(), text: task, completed: false },
      ]);
      setTask("");
    }
  }

  function removeTask(id, completed) {
    console.log(completed);
    if (taskCounter !== 0) setTaskCounter((taskCounter) => taskCounter - 1);
    if (finishedTaskCounter !== 0 && completed)
      setFinishedTaskCounter((taskCounter) => taskCounter - 1);
    setTasks(tasks.filter((task) => task.id !== id));
  }

  function toggleTask(id) {
    setTasks(
      tasks.map((task) => {
        task.id === id
          ? task.completed
            ? finishedTaskCounter
              ? setFinishedTaskCounter((counter) => counter - 1)
              : {}
            : setFinishedTaskCounter((counter) => counter + 1)
          : {};
        return task.id === id ? { ...task, completed: !task.completed } : task;
      })
    );
  }

  if (!loaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          {taskCounter - finishedTaskCounter > 0
            ? taskCounter - finishedTaskCounter > 5
              ? "I'm so disappointed you have more than 5 task not finished?!"
              : "Please finish your task, you idiot"
            : "To-Do List"}
        </Text>
        <View style={styles.headerComponents}>
          <TextInput
            style={styles.input}
            placeholder="Enter a task..."
            value={task}
            onChangeText={setTask}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity style={styles.addButton} onPress={addTask}>
            <Text style={styles.addButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.body}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={[
                styles.taskContainer,
                item.completed && styles.completedTask,
              ]}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => toggleTask(item.id)}
                  style={[
                    styles.checkbox,
                    item.completed && styles.completedCheck,
                  ]}
                ></TouchableOpacity>
                <Text
                  style={[
                    styles.taskText,
                    item.completed && styles.taskCompleted,
                  ]}
                >
                  {item.text}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => removeTask(item.id, item.completed)}
              >
                <Text style={styles.deleteText}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      {taskCounter !== 0 && (
        <View style={styles.taskCounterContainer}>
          <Text style={styles.counter}>{`Total: ${taskCounter}`}</Text>
          {taskCounter ? (
            <Text style={styles.counter}>
              {`Finished: ${finishedTaskCounter}`}
            </Text>
          ) : (
            <></>
          )}
        </View>
      )}
      {taskCounter - finishedTaskCounter === 0 && (
        <View>
          <Text style={styles.finish}>you have finished all tasks</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 60,
    paddingHorizontal: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 40,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 30,
    fontFamily: "Galindo",
  },
  headerComponents: {
    flexDirection: "row",
    height: 45,
    gap: 20,
    paddingHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    paddingLeft: 20,
    borderColor: "lightgray",
    borderRadius: 1000,
    height: "100%",
    width: "75%",
    placeholderTextColor: "lightgray",
    fontFamily: "Galindo",
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 1000,
    alignItems: "center",
    width: "25%",
  },
  addButtonText: { color: "white", fontFamily: "Galindo", fontSize: 16 },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginHorizontal: 10,
    borderRadius: 5,
    fontFamily: "Galindo",
  },
  taskText: {
    fontSize: 16,
    flexWrap: "wrap",
    maxWidth: "70%",
    fontFamily: "Galindo",
  },
  deleteText: { color: "#f05550", fontFamily: "Galindo", fontWeight: "bold" },
  header: { marginBottom: 30, width: "100%" },
  body: {
    fontFamily: "Galindo",
    flex: 1,
    width: "100%",
    borderWidth: 3,
    borderRadius: 5,
    borderColor: "lightgray",
    marginBottom: 20,
  },
  counter: { fontSize: 18, fontFamily: "Galindo", fontWeight: "bold" },
  finish: {
    fontFamily: "Galindo",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 20,
  },
  checkbox: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: "lightgray",
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  completedTask: {
    backgroundColor: "#cbded380",
  },
  completedCheck: {
    backgroundColor: "#2ECC7190",
    borderColor: "#2ECC7177",
  },
  taskCompleted: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  taskCounterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    columnGap: 40,
    fontFamily: "Galindo",
  },
});

export default App;
