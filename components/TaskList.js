import { View, Text, FlatList, RefreshControl } from 'react-native'
import React,  {useState, useEffect} from 'react'
import { render } from 'react-dom'
import TaskItem from './TaskItem'
import { deleteTask, getTasks } from '../api'
import { useIsFocused } from '@react-navigation/native'

const TaskList = () => {

  const isFocused = useIsFocused();

  const [tasks, setTasks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadTasks = async () =>{
    const data = await getTasks();
    setTasks(data);
  }
  useEffect(() => {
    loadTasks();
  },[isFocused]);

  const handleDelete = async (id) => {
    await deleteTask(id);
    loadTasks();
  }

  const renderItem = ({item})=> {
    return <TaskItem task={item} handleDelete={handleDelete}/>;
  }

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await loadTasks();
    setRefreshing(false);
  });



  return (
    <FlatList
      style={{width: '100%'}}
      data={tasks}
      keyExtractor={(item)=> item.id+""}
      renderItem={renderItem}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          colors={['#78e08f']}
          onRefresh={onRefresh}
          progressBackgroundColor="#0a3d62"
        />
      }
    />
  )
}

export default TaskList