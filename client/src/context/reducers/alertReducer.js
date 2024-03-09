const alertReducer = (state = null, actiom) => {
  switch (actiom.type) {
    case "SET_SUCCESS":
      return actiom.alert;

    case "SET_WARNING":
      return actiom.alert;

    case "SET_DANGER":
      return actiom.alert;

    case "SET_INFO":
      return actiom.alert;

    case "SET_ALERT_NULL":
      return actiom.alert;

    default:
      return state;
  }
};


export default alertReducer;