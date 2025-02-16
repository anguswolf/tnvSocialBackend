export default (user) => {
    const out = {
      id: user._id,
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