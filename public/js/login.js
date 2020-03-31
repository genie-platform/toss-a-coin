function onSignIn (googleUser) {
  debugger
  var tokenId = googleUser.getAuthResponse().id_token
  window.fetch('/api/v1/login/google', {
    method: 'POST',
    body: JSON.stringify({ tokenId }),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }).then(response => response.json()).then(data => {
    console.log({ data })
    window.state.jwt = data.token
  })
  // console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  // console.log('Name: ' + profile.getName());
  // console.log('Image URL: ' + profile.getImageUrl());
  // console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}