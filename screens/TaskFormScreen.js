import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { getTask, saveTask, updateTask } from '../api'

const TaskFormScreen = ({navigation, route}) => {
  const [task,setTask]=useState({
    title: '',
    description: ''
  })
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if(route.params && route.params.id){
      navigation.setOptions({ headerTitle: 'Updating a Task' });
      setEditing(true);
      (async()=>{
        const task = await getTask(route.params.id);
        setTask({title: task.title, description: task.description});
      })();
    }
  },[]);

  const handleChange = (name, value) => setTask({...task, [name]: value});

  const handleSubmit = async () => {
    try {
      if(!editing){
        await saveTask(task);
      }else{
        await updateTask(route.params.id, task);
      }
      navigation.navigate('HomeScreen');  
    }
    catch (err) {
          console.log(err);
    }
    }
  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder='write a title'
        placeholderTextColor='#546574'
        onChangeText={(text)=> handleChange('title',text)}
        value={task.title}
      />
      <TextInput
        style={styles.input}
        placeholder='write a description'
        placeholderTextColor='#546574'
        onChangeText={(text)=> handleChange('description',text)}
        value={task.description}
      />

      <TouchableOpacity 
        style={styles.buttonSave}
        onPress={handleSubmit}
      >
      {
        !editing ? (
        <Text
          style={styles.buttonText}
        >Save Task</Text>

        ):(
        <Text
          style={styles.buttonText}
        >Update Task</Text>
        )
      }
      </TouchableOpacity>
    </Layout>
  )
}

export default TaskFormScreen

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '10ac84',
    height: 35,
    color: '#ffffff',
    padding: 4,
    textAlign: 'center',
    borderRadius: 5
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#10ac84',
    width: '90%'
  },
  buttonText:{
    color: '#ffffff',
    textAlign: 'center'
  }
})
