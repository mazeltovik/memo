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
    windowWidth:number;
}

function Slide({mainHeader,info,windowWidth}:SlideProps){
    return (
      <View style={{width:windowWidth,...slideStyles.slideContainer}}>
          <Text style={slideStyles.mainHeader}>{mainHeader}</Text>
          <Text style={slideStyles.info} android_hyphenationFrequency="full">
              {info}
          </Text>
      </View>
    )
}


export default function Carousel(){
    const scrollX = useAnimatedValue(0);
    const {width: windowWidth} = useWindowDimensions();
    return (
      <View style={slideStyles.scrollContainer}>
        <ScrollView
            horizontal={true}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(event: NativeSyntheticEvent<NativeScrollEvent>) =>{
              
              const dist =  event.nativeEvent.contentOffset.x * 0.9;
              [{nativeEvent: {
                contentOffset: {
                  x: scrollX
                }
              }
            }]
            }}
            scrollEventThrottle={1}>
            {slideData.map((slide, slideIndex) => {
              return (
                <Slide mainHeader={slide.mainHeader} info={slide.info} windowWidth={windowWidth} key={slideIndex}/>
              );
            })}
          </ScrollView>
      </View>
    )
}


const slideStyles = StyleSheet.create({
    slideContainer:{
        paddingLeft:16,
        paddingRight:16,
        gap:16,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollContainer: {
      flex:0.8,
      alignItems: 'center',
      justifyContent: 'center',   
      backgroundColor:'#c9ccf0',   
    },
    mainHeader:{
        textAlign:"center",
        paddingTop:8,
        fontFamily:'Nunito-Bold'
    },
    info:{
        marginLeft:8,
        marginRight:8,
        textAlign:'justify',
        fontFamily:'Nunito-Regular'
    }
});