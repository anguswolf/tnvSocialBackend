export default (user) => {
    const out = {
      email: user.email,
      displayName: user.displayName,
      displaySurname: user.displaySurname,
    }
    if(user.accessToken) {
      out.accessToken = user.accessToken;
      out.refreshToken = user.refreshToken;
    }
    return out
  }