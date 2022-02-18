import React, {useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CustomTextInput from '../../../../component/CustomTextInput';
import constants from '../../../../constants';
import {vw, vh} from '../../../../constants/Dimension';
import {useNavigation} from '@react-navigation/native';
import CustomButton from '../../../../component/CustomButton';
import {PermissionsAndroid} from 'react-native';
import Contacts from 'react-native-contacts';
import {ScrollView} from 'react-native-gesture-handler';
const inputStyles = {
  width: vw(340),
  backgroundColor: 'white',
  borderRadius: vw(10),
  marginTop: vh(20),
};
interface Props {
  getContact: any;
  route: any;
}
const addMember = (props: Props) => {
  const {getContact} = props.route.params;
  const navigation = useNavigation();
  const [sports, setSports] = useState('');

  const [selectedContact, setSelectedContatc] = React.useState([]);
  const [originalList, setOriginalList] = useState<any>([]);

  const [contact, setContact] = React.useState([]);

  async function getAllContacts() {
    try {
      const permission = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      if (permission === 'granted') {
        const contacts = await Contacts.getAll();
        console.log(contacts);
        setContact(contacts);
        setOriginalList(contacts);
      }
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    getAllContacts();
    // PermissionsAndroid.requestMultiple(
    //   PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS,
    //   PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
    //   {
    //     title: 'Contacts',
    //     message: 'This app would like to view your contacts.',
    //     buttonPositive: 'Please accept bare mortal',
    //   },
    // ).then(
    //   Contacts.getAll()
    //     .then(contacts => {
    //       // work with contacts
    //       console.log('contacts', contacts);
    //       setContact(contacts);
    //       setOriginalList(contacts);
    //     })
    //     .catch(e => {
    //       console.log('error', e);
    //     }),
    // );
  }, []);

  console.log('===cons', contact.length);
  const checkItemExistOrNot = (id: any) => {
    return selectedContact?.findIndex(item => item?.recordID === id);
  };

  const onItemPress = (item: any) => {
    if (selectedContact && selectedContact.length === 0) {
      // call in case of empty
      setSelectedContatc([...selectedContact, item]);
    } else {
      let index = checkItemExistOrNot(item?.recordID);
      if (index >= 0) {
        // item exist in selected tab
        selectedContact.splice(index, 1);
        setSelectedContatc([...selectedContact]);
        console.log(selectedContact);
      } else {
        setSelectedContatc([...selectedContact, item]);
      }
    }
  };

  const filterSports = (val: any) => {
    const filterlist =
      contact &&
      contact.length > 0 &&
      contact.filter(item =>
        item?.displayName?.toLowerCase().startsWith(val.toLowerCase()),
      );

    val.length === 0 ? setContact(originalList) : setContact(filterlist);
  };
  const renderContact = (item: any) => {
    return (
      <TouchableOpacity
        onPress={() => onItemPress(item)}
        style={[styles.alignRow, {borderBottomWidth: 0.4}]}>
        <Text style={styles.name}>{item?.displayName}</Text>
        {checkItemExistOrNot(item.recordID) >= 0 && (
          <Image style={styles.tick} source={constants.Images.icon_tick} />
        )}
      </TouchableOpacity>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.parent}>
        <View style={[styles.alignRow]}>
          <Text style={styles.addMember}>{'Add Members'}</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              style={styles.circleImage}
              source={constants.Images.crossCirlce}
            />
          </TouchableOpacity>
        </View>
        <CustomTextInput
          autoCapitalize="sentences"
          container={inputStyles}
          labelStyle={{color: 'white', fontWeight: '600'}}
          label={'Search '}
          fieldName="accountNumber"
          keyboardType="default"
          icon={constants.Images.search_icon}
          onChangeText={(type: string, val: string) => {
            setSports(val);
            filterSports(val);
          }}
          isError
          iconStyle={styles.iconStyle}
        />
        <View style={[styles.alignRow, {marginTop: vh(15)}]}>
          <Text style={{color: 'black'}}>{'Contacts'}</Text>
          <Text
            style={[styles.addMember, {fontSize: vw(16)}]}>{`${'Selected-'}${
            selectedContact.length
          }`}</Text>
        </View>

        <View style={{flex: 0.9}}>
          <ScrollView>
            {contact &&
              contact.length > 0 &&
              contact.map(item => renderContact(item))}
          </ScrollView>
        </View>

        <CustomButton
          buttonText={'Add'}
          // handleAction={onPressSave}
          isDisabled={!selectedContact.length > 0}
          handleAction={() => {
            getContact(selectedContact);
            navigation.goBack();
          }}
          textStyle={styles.textStyle}
          customStyle={[
            styles.saveButtonContainer,
            {backgroundColor: constants.Colors.appButtonColor},
          ]}
        />
      </View>
    </SafeAreaView>
  );
};

export default addMember;
const styles = StyleSheet.create({
  parent: {
    flex: 1,
    marginHorizontal: vw(16),
    marginTop: vh(20),
  },
  circleImage: {
    height: vw(30),
    width: vw(30),
  },
  alignRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: vh(15),
  },
  addMember: {
    fontSize: vw(18),
    fontWeight: 'bold',
    color: 'black',
  },
  iconStyle: {
    alignSelf: 'center',
  },
  tick: {
    height: vw(24),
    width: vw(24),
  },
  name: {
    fontSize: vw(16),
    color: 'black',
  },
  textStyle: {
    fontWeight: '600',
    fontSize: vw(14),
  },
  saveButtonContainer: {
    width: vw(320),
    alignSelf: 'center',
    borderRadius: vw(30),
    backgroundColor: '#6a9589',
    paddingVertical: vh(14),
    marginTop: vh(30),
    bottom: 20,
    position: 'absolute',
  },
});
