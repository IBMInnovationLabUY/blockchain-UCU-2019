module.exports = {

  /*
   * Calcular el total de puntos acumulados
   * @param {Object} usePointsTransactions objeto  con todas las transacciones UsePoints 
   */
  totalPointsCollected: function(usePointsTransactions) {
    var totalPointsCollected = 0;
    for (var i = 0; i < usePointsTransactions.length; i++) {
      totalPointsCollected = totalPointsCollected + usePointsTransactions[i].points;
    }
    return totalPointsCollected;
  },

  /*
   * Calcular el total de puntos dados
   * @param {Object} usePointsTransactions pbjecto con todas las transacciones EarnPoints
   */
  totalPointsGiven: function(earnPointsTransactions) {
    var totalPointsGiven = 0;
    for (var i = 0; i < earnPointsTransactions.length; i++) {
      totalPointsGiven = totalPointsGiven + earnPointsTransactions[i].points;
    }
    return totalPointsGiven;
  }

}
