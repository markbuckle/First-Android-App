import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';

import GoalItem from './components/GoalItem';
import GoalInput from './components/GoalInput';

export default function App() {
  // When the user types a character, we want to update our state, and save the enetered text (which can be accessed through enteredGoal), and then pass the entered goal back through the textinput 
  const [courseGoals, setCourseGoals] = useState ([]);
  const [isAddMode, setIsAddMode] = useState(false);

  console.log(courseGoals);

  const addGoalHandler = goalTitle => {
    if (goalTitle.length === 0) {
      return;
    };

    setCourseGoals(currentGoals => [
      ...currentGoals, 
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setIsAddMode(false);
  };

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter(goal => goal.id !== goalId);
    });
  };

  const cancelGoalAdditionHandler = () => {
    setIsAddMode(false);
  };

  return (
    <View style={styles.screen}>
      <Button title="Add New Goal" onPress={() => setIsAddMode(true)}/>
      <GoalInput 
        visible={isAddMode} 
        onAddGoal={addGoalHandler} 
        onCancel={cancelGoalAdditionHandler}/>
      {/* Flatlist is similar to ScrollView but allows items to scroll without rendering off screen (saves loading space) */}
      <FlatList
          keyExtractor={(item, index) => item.id}
          data={courseGoals} 
          renderItem={itemData => (
            <GoalItem 
              id={itemData.item.id} 
              onDelete={removeGoalHandler} 
              title={itemData.item.value}
            />
          )}
          />
      </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  }
});
