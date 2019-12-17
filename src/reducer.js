export default function reducer(state, { type, payload }) {
  switch (type) {
    case "FACEBOOK_LOGIN_SUCCESS":
      return {
        ...state,
        token: payload
      };
    case "FACEBOOK_LOGIN_FAIL":
      return {
        ...state, 
        token: null 
      };
    default:
      return state;
  }
}