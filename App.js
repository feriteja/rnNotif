import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import PushNotification from 'react-native-push-notification';

const App = () => {
  PushNotification.createChannel(
    {
      channelId: 'default_notification_channel', // (required)
      channelName: 'My channel', // (required)
      channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
      playSound: false, // (optional) default: true
      soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
      importance: 4, // (optional) default: 4. Int value of the Android notification importance
      vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
    },
    created => console.log(`createChannel returned '${created}'`),
    // (optional) callback returns whether the channel was created, false means it already existed.
  );
  PushNotification.configure({
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
      // notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    onAction: function (notification) {
      console.log('ACTION:', notification.action);
      console.log('NOTIFICATION:', notification);
    },

    onRegistrationError: function (err) {
      console.error(err.message, err);
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,

    requestPermissions: Platform.OS === 'ios',
  });

  const notify = () => {
    PushNotification.localNotification({
      channelId: 'default_notification_channel',
      title: 'bisa',
      message: 'Notification message',
      actions: ['Messages', 'News'],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Button title="test" onPress={() => notify()} />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
