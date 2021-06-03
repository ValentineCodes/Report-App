import React from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';

import PopUp from './PopUp';

export default function CriminalDescription({
  criminalDescription,
  setPickerItems,
}) {
  const criminal = {
    gender: ['Male', 'Female', 'No Idea'],
    skinColor: ['Dark', 'Light Brown', 'Fair', 'Albino', 'No Idea'],
    height: [
      'Really Short',
      'Short',
      'Average',
      'Tall',
      'Really Tall',
      'No Idea',
    ],
    age: ['Juvenile', 'Young Adult', 'Adult', 'Old', 'No Idea'],
    voice: ['Deep', 'Shallow', 'No Idea'],
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {/* Gender */}
      <TouchableOpacity onPress={() => setPickerItems(criminal.gender)}>
        <PopUp
          selectedValue={
            criminalDescription.gender == '' ||
            criminalDescription.gender == 'No Idea'
              ? 'Gender'
              : criminalDescription.gender
          }
        />
      </TouchableOpacity>
      {/* Skin Color */}
      <TouchableOpacity onPress={() => setPickerItems(criminal.skinColor)}>
        <PopUp
          selectedValue={
            criminalDescription.skinColor == '' ||
            criminalDescription.skinColor == 'No Idea'
              ? 'Skin Color'
              : criminalDescription.skinColor
          }
        />
      </TouchableOpacity>
      {/* Height */}
      <TouchableOpacity onPress={() => setPickerItems(criminal.height)}>
        <PopUp
          selectedValue={
            criminalDescription.height == '' ||
            criminalDescription.height == 'No Idea'
              ? 'Height'
              : criminalDescription.height
          }
        />
      </TouchableOpacity>
      {/* Age */}
      <TouchableOpacity onPress={() => setPickerItems(criminal.age)}>
        <PopUp
          selectedValue={
            criminalDescription.age == '' ||
            criminalDescription.age == 'No Idea'
              ? 'Age'
              : criminalDescription.age
          }
        />
      </TouchableOpacity>
      {/* Voice */}
      <TouchableOpacity onPress={() => setPickerItems(criminal.voice)}>
        <PopUp
          selectedValue={
            criminalDescription.voice == '' ||
            criminalDescription.voice == 'No Idea'
              ? 'Voice'
              : criminalDescription.voice
          }
        />
      </TouchableOpacity>
    </ScrollView>
  );
}
