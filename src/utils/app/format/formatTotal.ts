export = (cart) => {
  return cart.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.cost * currentValue.quantity;
  }, 0);
};
