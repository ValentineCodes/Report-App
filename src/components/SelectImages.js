import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';

import {Colors} from '../constants/colors';
import {styles} from '../constants/styles';

export default function SelectImages({
  images,
  setImages,
  setViewImages,
  setImageIndex,
  showImagePickerContainer,
}) {
  function deleteImage(key) {
    setImages(currentImages =>
      currentImages.filter(image => image.key !== key),
    );
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={showImagePickerContainer}>
        <Icon
          name="images-outline"
          type="ionicon"
          reverse
          color={Colors.secondaryTransparent}
          size={Dimensions.get('screen').width / 15}
        />
      </TouchableOpacity>

      {/* SelectedImages - Horizontal Display */}
      <ScrollView showsHorizontalScrollIndicator={false} horizontal>
        {images.map((image, index) => (
          <TouchableOpacity
            key={image.key}
            onPress={() => {
              setViewImages(true);
              setImageIndex(index);
            }}
            style={styles.imageContainer}>
            <Image source={{uri: image.uri}} style={styles.image} />
            <View style={styles.cancelButton}>
              <Icon
                reverse
                name="cancel"
                color="rgba(255,0,0,0.7)"
                size={7}
                onPress={deleteImage.bind(this, image.key)}
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
