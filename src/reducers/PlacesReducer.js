export default reducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return [...action.initialPlaces];
    case 'ADD':
      return [...state, action.newPlace];
    default:
      return state;
  }
};
