import ImagePicker from 'react-native-image-crop-picker';

const myPicker = {
  getSinglePic: (callback: Function, error: Function) => {
    ImagePicker.openPicker({
      cropping: true,
      compressImageQuality: 0.1,
      compressVideoPreset: 'Passthrough',
      freeStyleCropEnabled: true,
      // cropperCircleOverlay: isProfile ? false : false,
      // cropperActiveWidgetColor: 'red',
    })
      .then((image: any) => {
        const arr = image.path.split('/');
        const size = image.size;
        const filename = arr[arr.length - 1];
        callback(image.path, image.mime, filename, size);
      })
      .catch(error1 => {
        error();
      });
  },
  getCamera: (callback: Function, error: Function) => {
    ImagePicker.openCamera({
      cropping: true,
      compressImageQuality: 0.1,
      compressVideoPreset: 'Passthrough',
      freeStyleCropEnabled: true,
    })
      .then((image: any) => {
        const arr = image.path.split('/');
        const filename = arr[arr.length - 1];
        callback(image.path, image.mime, filename);
      })
      .catch(error2 => {
        console.log('error', error2);
        error();
      });
  },

  getVideo: (callback: Function) => {
    ImagePicker.openPicker({
      compressVideoPreset: 'Passthrough',
      mediaType: 'video',
    })
      .then((video: any) => {
        const arr = video.path.split('/');
        const size = video.size;
        const filename = arr[arr.length - 1];
        console.log('image', video);
        callback(video.path, video.mime, filename, size);
      })
      .catch(error => {
        console.log('error', error);
      });
  },
};

export default myPicker;
