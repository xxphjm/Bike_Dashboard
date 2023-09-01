import React,{useEffect,useState} from 'react';
import {View,Text,StyleSheet,Flex} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Navbar=()=>{
  const[time,setTime]=useState(null);

    setInterval(()=>{
      var newtime = new Date();
     
      setTime(newtime.toLocaleTimeString());
    },1000)


return(
<View style={styles.container}>
  <View style={styles.box}>
<Text>{time}</Text>
<Icon name="settings" size={30}  />

</View>
</View>
)
}
export default Navbar;
const styles = StyleSheet.create({
    container: {
      flex: 1,

     paddingLeft:15,
      paddingRight:15,

    },
    box:{
      flex:1,
      flexDirection:'row',
      justifyContent:'space-between', 
      alignItems:'center',
      
    }

  });