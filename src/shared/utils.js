export const updateObj = (oldObj, newObj) => {
  return {
    ...oldObj,
    ...newObj,
  };
};

export const validate = (val, rule) => {
  let isValid = true;
  if (rule.required) {
    isValid = val.trim() !== "" && isValid;
  }
  if (rule.minLength) {
    isValid = val.length >= rule.minLength && isValid;
  }
  if (rule.maxLength) {
    isValid = val.length <= rule.maxLength && isValid;
  }
  if (rule.isEmail) {
    isValid =
      // eslint-disable-next-line
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        val
      ) && isValid;
  }
  if (rule.isNumeric) {
    isValid = /^\d+$/.test(val) && isValid;
  }
  return isValid;
};

export const getBurgerPrice = (ings) => {
  let price = 2;
  const INGREDIENT_PRICES = {
    lettuce: 0.3,
    tomato: 0.2,
    onion: 0.2,
    cheese: 0.5,
    beef: 1.7,
    chicken: 1.2,
    sauce: 0.8,
    bacon: 1.8,
  };

  for (let ing in ings) {
    price += INGREDIENT_PRICES[ing] * ings[ing];
  }

  return price.toFixed(2);
};
