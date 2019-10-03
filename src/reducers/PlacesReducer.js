export default reducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.newPlace];
    default:
      return state;
  }
};
