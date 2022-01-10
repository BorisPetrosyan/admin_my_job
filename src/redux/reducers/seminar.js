const initialState = {
  data: [],
  from_page: null,
};

export default function glossaryReducer(
  state = initialState,
  { type, payload }
) {
  switch (type) {
    case "SET_SEMINARS":
      return {
        ...state,
        data: payload,
      };
    case "SET_SEMINARS_FROM_PAGE":
      return {
        ...state,
        from_page: payload,
      };
    default:
      return state;
  }
}
