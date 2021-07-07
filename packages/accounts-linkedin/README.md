# OAuth авторизация дл LinkedIn

Пакет основан на [facebook-oauth](https://github.com/meteor/meteor/tree/master/packages/facebook-oauth) и [accounts-facebook](https://github.com/meteor/meteor/tree/master/packages/accounts-facebook)

## Использование
```javascript
Meteor.loginWithLinkedIn({
  requestPermissions: ['email']
}, (err) => {
  if (err) {
    // handle error
  } else {
    // successful login!
  }
});
``` 
