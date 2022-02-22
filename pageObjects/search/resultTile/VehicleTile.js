class VehicleTile {
  _resultTileLocator = `[data-qa="results-section"] [data-qa="result-tile"]`;
  _trimAndMilageLocator = '[data-qa="results-section"] [data-qa="result-tile"] [data-qa="trim-mileage"]';
  _makeAndModelLocator = Selector.getByQa('make-model');
  _trimLocator = '[data-qa="results-section"] [data-qa="result-tile"] [data-qa="trim-mileage"]';
  _purchaseLockedLocator = '[data-qa="text-only-locked"]';
  _experimentPurchaseLockedLocator = '[data-qa="text-only-locked"]';


  get getResultTilesPO() {
    return (async () =>
      await Action.getPageObject(this._resultTileLocator, true))();
  }

  get getPurchaseInProgressPO() {
    return (async () =>
      await Action.getPageObject(this._purchaseLockedLocator, true))();
  }

  get getExperimentPurchaseInProgressPO() {
    return (async () =>
      await Action.getPageObject(_experimentPurchaseLockedLocator, true))();
  }

  get getResultTilePO() {
    return (async () =>
      await Action.getPageObject(this._resultTileLocator))();
  }

  get getVehicleMakeAndModelPO() {
    return (async () => {
      const tiles = await Action.getPageObject(this._makeAndModelLocator, true);
      return tiles;
    })();
  }

  get getVehicleMilesPO() {
    return (async () =>
      await Action.getPageObject(
        this._trimAndMilageLocator,
        true
      ))();
  }

  get getVehicleTrimPO() {
    return (async () =>
      await Action.getPageObject(
        this._trimLocator,
        true
      ))();
  }

  async totalResultTiles() {
    const tiles = await this.getResultTilesPO;
    return tiles.length;
  }

  async isVehicleTileVisible() {
    return await Action.isPageObjectVisible(await this.getResultTilePO);
  }

  async vehicleTrim(value = 0) {
    const elements = await this.getVehicleTrimPO;
    return await Action.getText(elements[value]);
  }

  async vehicleMiles(value = 0) {
    const elements = await this.getVehicleMilesPO;
    return await Action.getText(elements[value]);
  }

  async vehiclePurchaseInProgress(value = 0) {
    const elements = await this.getPurchaseInProgressPO;
    return await Action.getText(elements[value]);
  }

  async experimentVehiclePurchaseInProgress(value = 0) {
    const elements = await this.getExperimentPurchaseInProgressPO;
    return await Action.getText(elements[value]);
  }

  async vehicleMakeAndModel(value = 0) {
    let yearAndModel = '';
    const elements = await this.getVehicleMakeAndModelPO;
    if (value >= elements.length) {
      throw new Error(`Total number of cars found ${elements.length}`);
    }
    yearAndModel = await Action.getText(elements[value]);
    return Action.removeLineBreaks(yearAndModel);
  }
}

module.exports = new VehicleTile();
