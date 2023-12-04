import React from 'react';
import {View,Text,StyleSheet} from 'react-native';

const Content=({speed})=>{

return(
<View style={styles.container}>
<Text style={{fontWeight:600,fontSize:78}}>KKH-1000</Text>
<Text style={{fontSize:48}} >{speed}m/s</Text>
</View>
)
}
export default Content;
const styles = StyleSheet.create({
    container: {
      flex: 1,

      alignItems: "center",
      justifyContent: "center",
    },

  });