const loginUser = (auth, userId = 1) => {
  return (done) => {
    auth.token = userId;
    return done();
  };
};

export default loginUser;
