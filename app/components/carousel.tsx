import {   ScrollView,
    Text,
    StyleSheet,
    View,
    Button,
    ImageBackground,
    Animated,
    useWindowDimensions,
    useAnimatedValue, } from "react-native";
    import { useRef, useEffect } from 'react';

type SlideData = {
    mainHeader:string;
    info:string;
}

const slideData = [
    {
        mainHeader:'Приветствую!',
        info:`Данное приложение разрабатывалось, для поддержки вашего мозга в тонусе.`
    },
    {
        mainHeader:'Предварительная оценка.',
        info:`Проведите предварительную оценку работы префронтальной коры вашего головного мозга.        
        `
    },
    {
        mainHeader:'Упражнения.',
        info:`Решайте по одному блоку упражнений в день. Задачи на сложение, умножение, деление расположены в случайном порядке.Как только время потраченное вами на вычесления, начнет уменьшаться, Вы заметите, как начнут улучшаться ваши способности к решению арифметических задач.
        `
    },
    {
        mainHeader:'Оценка.',
        info:`Через пять дней проведите оценку работы префронтальной коры.
        `
    }
]

type SlideProps = {
    mainHeader:string;
    info:string;
}

function Slide({mainHeader,info}:SlideProps){
    return <View style={slideStyles.container}>
        <Text style={slideStyles.mainHeader}>{mainHeader}</Text>
        <Text style={slideStyles.info} android_hyphenationFrequency="full">
            {info}
        </Text>
    </View>
}


export default function Carousel(){
    return (
        <Slide mainHeader={slideData[0].mainHeader} info={slideData[0].info}/>
    )
}


const slideStyles = StyleSheet.create({
    container:{
        marginLeft:16,
        marginRight:16,
        backgroundColor:'#c9ccf0',
        gap:16,
    },
    mainHeader:{
        textAlign:"center",
        paddingTop:8,
        fontFamily:'Nunito-Regular'
    },
    info:{
        marginLeft:8,
        marginRight:8,
        textAlign:'justify',
        fontFamily:'Nunito-Bold'
    }
});