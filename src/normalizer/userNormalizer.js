export default (user) => {
    const out = {
      email: user.email,
      displayName: user.displayName,
      displaySurname: user.displaySurname,
      avatar: user.avatar,
    }
    if(user.accessToken) {
      out.accessToken = user.accessToken;
      out.refreshToken = user.refreshToken;
    }
    return out
  }