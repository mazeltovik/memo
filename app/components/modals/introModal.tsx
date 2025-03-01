import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { MainModalProps } from '../modalView';
import ButtonWrapper, { ButtonContainer } from '../buttonWrapper';

export default function IntroModal({
  modalVisible,
  setModalVisible,
}: MainModalProps) {
  const approvedPress = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContainer}>
        <ScrollView>
          <Text style={styles.modalHeader}>приветствую!</Text>
          <Text style={styles.introContent} android_hyphenationFrequency="full">
            Разработка данного приложения была вдохновлена работами японского
            невролога, профессора Рюты Кавашимы, и представляет собой частичное
            переосмысление идей, изложенных в его книге «Японская система
            развития интеллекта и памяти». Приложение не имеет коммерческой
            направленности и создано с целью привлечения внимания потенциальных
            работодателей к разработчику. Данное приложение представляет собой
            60-дневный курс тренировки мозга, по завершении которого можно
            начать курс заново. Внутри вы найдете ряд упражнений, которые
            помогут вам в этом начинании. Пожалуйста, обязательно ознакомьтесь с
            обучающими материалами, так как именно они позволят вам получить
            максимально качественный опыт использования приложения. Спасибо и
            удачи вам!
          </Text>
        </ScrollView>
        <View style={{ justifyContent: 'space-around' }}>
          <ButtonWrapper>
            <ButtonContainer
              text={'продолжить'}
              onClick={approvedPress}
              backgroundColor="#879c7d"
            />
          </ButtonWrapper>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    padding: 16,
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#353945',
    borderRadius: 20,
    padding: 16,
    gap: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalHeader: {
    paddingBottom: 16,
    color: '#f6c25d',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  introContent: {
    color: '#fbd499',
    fontFamily: 'Poiret-One',
    fontWeight: 'regular',
    textAlign: 'justify',
  },
});
