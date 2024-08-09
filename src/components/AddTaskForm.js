import { View, Text, TextInput ,StyleSheet, Button} from 'react-native'
import React, { useState } from 'react'
import { addTask } from '../features/slices/taskSlice'
import { useDispatch } from 'react-redux'


export default function AddTaskForm() {
   const dispatch = useDispatch();
   const [text,setText]= useState('')


    const handleAddTask = () => {
    if (text.trim()) {
      dispatch(addTask({ text }));
      setText('');
    }
  };
  return (
    <View style={styles.container}>
         <TextInput
         style={styles.input}
         placeholder='enter task'
         value={text}
         onChangeText={setText}
         />
         <Button color={"black"} title='Add task' onPress={handleAddTask}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        padding:16,

    },
    input:{
        borderBottomWidth:1,
        marginBottom:8,
        padding:8,
    }


})