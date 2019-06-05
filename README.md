# Bertacchi's FlashCards

This is a mobile app that allow users to study a collection of flashcards. User can create flashcards categories, called decks, create flashcards with question and answer and add them to her decks, and use decks for studing purposes.

## Run the app

1. Install expo app in your mobile phone. [iOS](https://itunes.apple.com/app/apple-store/id982107779) [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&referrer=www). A bug in Expo Client 2.11.0 (SDK 33) prevents correct local notification scheduling. See https://github.com/expo/expo/issues/4356. For testing local notifications use standalone app or Expo Client 2.10.6 [Android](https://d1ahtucjixef4r.cloudfront.net/Exponent-2.10.6.apk); [iOS](https://dpq5q02fu5f55.cloudfront.net/Exponent-2.10.0.tar.gz)
1. `yarn install`
1. `yarn start`
1. Use Expo Client on your device to scan the QR code printed by the last command.

## App platform

This app was tested on a real device with Android 8.0 and Expo Client version 2.10.6.

## Project additions

* redux / redux-thunk
* flow
* eslint
* jest

## Project Specs

See https://review.udacity.com/#!/rubrics/1215/view
