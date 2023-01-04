import { View, Text, FlatList } from 'react-native'
import React from 'react'

import {getTasks} from '../api';
import TaskList from '../components/TaskList';
import Layout from '../components/Layout';


const HomeScreen = () => {

  return (
    <Layout>
      <TaskList/>
    </Layout>
  )
}

export default HomeScreen