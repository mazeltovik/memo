import { PropsWithChildren } from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

export type MainModalProps = {
    modalVisible:boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function MainModal({children}:PropsWithChildren<any>){
    return (
        <View>
            {children}
        </View>
      );
}


const styles = StyleSheet.create({
    centeredView: {
        position:'absolute'
    //   flex: 1,
    //   justifyContent: 'center',
    //   alignItems: 'center',
    //   backgroundColor:'black'
    },
});