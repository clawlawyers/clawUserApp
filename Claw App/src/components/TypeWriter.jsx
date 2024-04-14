import React, { useState, useEffect } from 'react';
import { View,Text } from 'react-native';
import { lawFacts } from '../data/lawFactList';
const Typewriter = ({ text, delay }) => {

  const typerWriterText = lawFacts[ text];
 
  
  
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  //console.log(text, typerWriterText);
  // Typing logic goes here
  useEffect(() => {
    if(typerWriterText != undefined){
      if (currentIndex < typerWriterText.length) {
        const timeout = setTimeout(() => {
          setCurrentText(prevText => prevText + typerWriterText[currentIndex]);
          setCurrentIndex(prevIndex => prevIndex + 1);
        }, delay);
    
        return () => clearTimeout(timeout);
      }
    }
    
  }, [currentIndex, delay, typerWriterText]);
  
  return <Text>{currentText}</Text>;
};

export default Typewriter;