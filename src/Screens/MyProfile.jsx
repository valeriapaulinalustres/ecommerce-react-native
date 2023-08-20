import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useGetProfileImageQuery } from '../Services/shopServices';
import SubmitButton from '../Components/SubmitButton';

const MyProfile = ({ navigation }) => {
  const { localId, profileImage } = useSelector(
    (state) => state.userReducer.value
  );

  const { data: image } = useGetProfileImageQuery(localId);

  const cameraImage = image?.image;

  const launchCamera = async () => {
    navigation.navigate('Image Selector');
  };

  const launchLocation = async () => {
    navigation.navigate('List Address');
  };

  return (
    <View style={styles.container}>
      {profileImage || cameraImage ? (
        <Image
          source={{ uri: profileImage || cameraImage }}
          style={styles.image}
          resizeMode='cover'
        />
      ) : (
        <Image
          source={require('../Assets/Images/defaultProfile.png')}
          style={styles.image}
          resizeMode='cover'
        />
      )}
      <SubmitButton onPress={launchCamera} title='Add profile picture' />
      <SubmitButton onPress={launchLocation} title='My address' />
    </View>
  );
};

export default MyProfile;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    gap: 15,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: '100%',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
