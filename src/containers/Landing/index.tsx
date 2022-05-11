import React, {useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {vw, vh} from '../../constants/Dimension';
import Header from '../../component/Header';
import constants from '../../constants';
import CustomTextInput from '../../component/CustomTextInput';
import CustomButton from '../../component/CustomButton';
import {useDispatch, useSelector} from 'react-redux';
import {getCircle} from '../../modules/Auth';
import moment from 'moment';
import {useFocusEffect} from '@react-navigation/native';
import Loader from '../../component/Loader/Loader';
import images from '../../constants/images';
import {useNavigation} from '@react-navigation/native';
import Screens from '../../constants/Screens';
import Router from '../../navigator/routes';
import {VESDK, VideoEditorModal, Configuration} from 'react-native-videoeditorsdk';


const Home = () => {

  interface UniqueItem {
    /** A unqiue string that makes the item unique identifiable. */
    identifier: string;
  }

   interface NamedItem extends UniqueItem {
    /** A displayable name for the item which is also used for accessibliblity. */
    name: string;
  }

  interface MediaItem extends UniqueItem {
    /**
     * The title of the media item.
     * @example // Defaults to:
     * null
     */
    title?: string;
    /**
     * The artist of the media item.
     * @example // Defaults to:
     * null
     */
    artist?: string;
  }
  
  interface AudioClip extends MediaItem {
    /**
     * A URI for the thumbnail image of the audio clip.
     * If `null` a placeholder image will be used.
     * @example // Defaults to:
     * null
     */
    thumbnailURI?: AssetURI;
    /**
     * The duration of the audio clip in seconds.
     * If `null` the duration will be automatically derived from the asset.
     * @example // Defaults to:
     * null
     */
    duration?: number;
    /** A URI for the audio clip.
     * @note Remote resources are not optimized and therefore should be downloaded
     * in advance and then passed to the editor as local resources.
     */
    audioURI: AssetURI;
  }

  /** A audio clip category. */
 interface AudioClipCategory extends NamedItem {
  /**
   * A URI for the thumbnail image of the category.
   * If `null` a placeholder image will be used.
   */
  thumbnailURI?: AssetURI;
  /**
   * Items of the category.
   * If `null` an empty category will be created.
   * @example // Defaults to:
   * null
   */
  items?: (AudioClip)[];
}

enum CanvasAction {
  UNDO = "undo",
  REDO = "redo",
  DELETE = "delete",
  BRING_TO_FRONT = "bringtofront",
  ADD = "add",
  FLIP = "flip",
  INVERT = "invert",
  SOUND_ON_OFF = "soundonoff",
  PLAY_PAUSE = "playpause",
}

  let configuration: Configuration = {

 
    // Configure sticker tool
    // sticker: {
    //   // Enable personal stickers
    //   personalStickers: true,
    //   // Configure stickers
    //   categories: [
    //     // Create sticker category with stickers
    //     // Reorder and use existing sticker categories
    //     { identifier: 'imgly_sticker_category_animated' },
    //     { identifier: 'imgly_sticker_category_emoticons' },
    //     // Modify existing sticker category
    //     {
    //       identifier: 'imgly_sticker_category_shapes',
    //       items: [
    //         { identifier: 'imgly_sticker_shapes_badge_01' },
    //         { identifier: 'imgly_sticker_shapes_arrow_02' },
    //         { identifier: 'imgly_sticker_shapes_spray_03' },
    //       ],
    //     },
    //   ],
    // },
    audio:{
      categories:[{identifier:'demo_video',name:'Audio',thumbnailURI:constants.Images.Logo,items:[
        {identifier:'demo_audio',thumbnailURI:constants.Images.Logo,audioURI:require('./../../../sample1.mp3'),duration:60}
      ]}],
      canvasActions:[CanvasAction.DELETE,CanvasAction.PLAY_PAUSE] 
      // categories:[
      //   {thumbnailURI:null,items:[{thumbnailURI:null,audioURI:'./../../assets/Images/AudioFile/sample1.mp3'},{thumbnailURI:null,audioURI:'./../../assets/Images/AudioFile/sample2.mp3'}]}
      // ]
    }
  };
  

 

 

  const onVideoPick=()=>{
    VESDK.openEditor(require('./../../assets/Images/Video/Test.mp4'),configuration);

  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: constants.Colors.themeGreen,
        width: '100%',
        justifyContent:'center',
        alignItems:'center'
      }}>
      <TouchableOpacity onPress={onVideoPick} style={{backgroundColor:'grey',borderRadius:vw(10)}}>
        <Text style={{padding:vw(10)}}>{"pick video"}</Text>
      </TouchableOpacity>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  innerContainner: {
    flex: 1,
    backgroundColor: constants.Colors.themeGreen,
    paddingHorizontal: vw(16),
    marginBottom: vh(20),
  },
  backButtom: {
    alignItems: 'center',
  },
  iconColor: {
    height: vw(21),
    width: vw(75),
    resizeMode: 'contain',
  },
  helloSqr: {
    fontSize: vw(20),
    color: 'white',
    marginTop: vh(33),
  },
  inrContainer: {
    marginTop: vh(31),
    marginBottom: vh(16),
  },
  circle: {
    height: vw(40),
    width: vw(40),
    borderRadius: vw(20),
    backgroundColor: '#4B517D',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  pStyle: {
    fontSize: vw(16),
    color: '#9EA3C5',
  },
  LogoutCnt: {
    width: vw(121),
    backgroundColor: '#4B517D',
    borderRadius: vw(5),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: vh(15),
    marginTop: vh(5),
    paddingLeft: vw(20),
  },
  rightCont: {
    marginTop: vh(25),
    marginBottom: vh(16),
  },
  LogoutText: {
    fontSize: vw(14),
    color: 'white',
  },
  containeer: {
    flexDirection: 'row',
    borderRadius: vw(10),
    marginVertical: vh(5),
    justifyContent: 'space-between',
  },
  imageStyle: {
    height: vw(38),
    width: vw(38),
    borderRadius: vw(19),
  },
  imageRow: {
    height: vw(20),
    width: vw(20),
    borderRadius: vw(10),
  },
  caleder: {
    height: vw(15),
    width: vw(15),
  },
  buy: {
    fontSize: vw(12),
    color: '#BEC1D8',
    paddingHorizontal: vw(10),
    textTransform: 'uppercase',
  },
  buyRight: {
    fontSize: vw(12),
    color: '#63B995',
    paddingHorizontal: vw(10),
    textTransform: 'uppercase',
    fontWeight: '500',
  },
  count: {
    color: 'black',
    fontSize: vw(16),
    fontWeight: '900',
  },
  gatewayName: {
    fontSize: vw(16),
    color: '#DFE0EC',
    fontWeight: '500',
  },
  alignRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: vh(10),
  },
  address: {
    color: '#DFE0EC',
    fontSize: vw(16),
    marginLeft: vw(10),
  },
  marginTop10: {
    marginTop: vh(10),
  },
});

export default Home;
