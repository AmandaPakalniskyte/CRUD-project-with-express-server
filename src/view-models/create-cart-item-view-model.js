const createCartItemViewModel = (cartItemDoc) => ({
    houseId: cartItemDoc.houseId.toString(),
    amount: cartItemDoc.amount
  })
  
  module.exports = createCartItemViewModel;