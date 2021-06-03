import React from 'react';
import {View, TouchableOpacity, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

import {Colors} from '../constants/colors';
import {styles} from '../constants/styles';

export default function SelectVideo({video, setIsWatchingVideo, setVideo}) {
  function selectVideoFromLibrary() {
    ImagePicker.openPicker({
      compressImageQuality: 0.5,
      mediaType: 'video',
    })
      .then(video => {
        if (
          video.mime === 'image/jpeg' ||
          video.mime === 'image/png' ||
          video.mime === 'image/gif'
        ) {
          alert('Not a video. Select a video');
        } else {
          setVideo({
            key: Math.random().toString(),
            uri: video.path,
            type: video.mime,
            filename: video.path.substr(video.path.lastIndexOf('/') + 1),
          });
        }
      })
      .catch(err => {
        return;
      });
  }

  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <TouchableOpacity onPress={selectVideoFromLibrary}>
        <Icon
          name="videocam-outline"
          type="ionicon"
          reverse
          color={Colors.secondaryTransparent}
          size={Dimensions.get('screen').width / 15}
        />
      </TouchableOpacity>

      {/* Display Selected Video */}
      {video !== null ? (
        <TouchableOpacity
          onPress={() => setIsWatchingVideo(true)}
          style={styles.videoContainer}>
          <Video
            source={{uri: video.uri}}
            style={{width: '100%', height: '100%'}}
            paused={true}
          />
          <View style={styles.cancelButton}>
            <Icon
              reverse
              name="cancel"
              color="rgba(255,0,0,0.7)"
              size={7}
              onPress={() => setVideo(null)}
            />
          </View>
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
