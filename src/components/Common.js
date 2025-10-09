
export function getEmptyIngredient() {
  return {
    "label": "",
    "amount": { "whole": 1, "num": 0, "dem": 1 },
    "units": "",
  }
};

export const numericProps = {
  htmlInput: {
    inputMode: 'numeric',
  }
};