
import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { editTask } from '../features/slices/taskSlice';

const EditTaskForm = ({ task, onClose }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(task.text);

  const handleEditTask = () => {
    if (text.trim()) {
      dispatch(editTask({ id: task.id, text }));
      onClose();
    }
  };

  useEffect(() => {
    setText(task.text);
  }, [task]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Edit task"
        value={text}
        onChangeText={setText}
      />
      <Button title="Save" onPress={handleEditTask} />
      <Button title="Cancel" onPress={onClose} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 8,
    padding: 8,
  },
});

export default EditTaskForm;