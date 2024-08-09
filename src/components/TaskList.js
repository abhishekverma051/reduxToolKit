import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { removeTask, toggleTask, editTask } from "../features/slices/taskSlice";
import AddTaskForm from "./AddTaskForm";
import { LinearGradient } from "expo-linear-gradient";

const TaskList = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks.tasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedText, setEditedText] = useState("");

  const handleEdit = (task) => {
    setEditingTaskId(task.id);
    setEditedText(task.text);
  };

  const handleSaveEdit = () => {
    if (editedText.trim()) {
      dispatch(editTask({ id: editingTaskId, text: editedText }));
      setEditingTaskId(null);
      setEditedText("");
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setEditedText("");
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {editingTaskId === item.id ? (
        <View style={styles.editContainer}>
          <TextInput
            style={styles.input}
            value={editedText}
            onChangeText={setEditedText}
            placeholder="Edit task"
          />
          <Button title="Save" onPress={handleSaveEdit} />
          <Button title="Cancel" onPress={handleCancelEdit} color="red" />
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => dispatch(toggleTask(item.id))}
            style={styles.button}
          >
            <Text style={[styles.text, item.completed && styles.completed]}>
              {item.text}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleEdit(item)}>
            <Text style={styles.edit}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dispatch(removeTask(item.id))}>
            <Text style={styles.delete}>Delete</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );

  const totalTasks = tasks.length;

  return (
    <LinearGradient
      colors={[
        "#401095",
        "#21c0bf",
        "#128d15",
        "#fefd38",
        "#fd8e25",
        "#fc0d1c",
      ]}
      start={{ x: 0, y: 1 }}
      end={{ x: 0, y: 0 }}
      style={styles.linearGradient}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Todo App</Text>
        <AddTaskForm />
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
        />
        <Text style={styles.counter}>Total number of tasks: {totalTasks}</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  container: {
    padding: 16,
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
  },
  header: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    paddingTop: 22,
  },
  item: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    borderRadius: 7,

    elevation: 4,
  },
  text: {
    fontSize: 16,
    flex: 1,
  },
  completed: {
    textDecorationLine: "line-through",
  },
  delete: {
    color: "red",
  },
  edit: {
    color: "blue",
  },
  editContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  input: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginRight: 8,
    padding: 4,
  },
  counter: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  button: {
    width: 100,
  },
});

export default TaskList;
