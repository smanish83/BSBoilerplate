class MakeAndModelFilter{
  _makeAndModelButtonLocator = 'span*=MAKE & MODEL';
  _makeLogoWrapperLocator = '.make-logo-select-wrap';
  _applyFilterButtonLocator ='[data-qa=styled-modal] [class*=ApplyFiltersButton]'
  _trimsTextLocator = Selector.getByQa('trims-text');
  _makeAndModelTextLocator = Selector.getByQa('make-model-text');
  _selectorCheckmarkLocator = Selector.getByQa('checkmark');
  _selectAllTrimLocator = '.select-all-trims';
  _backToModelsButtonLocator = '.back-to-models';
  _backToMakesButtonLocator = '.back-to-makes';
  
  get getCarMakeAndModelTabPO() {
    return (async () => await Action.getPageObject(this._makeAndModelButtonLocator))();
  }

  get getCarMakeLogoWrapperPO() {
    return (async () => await Action.getPageObject(this._makeLogoWrapperLocator))();
  }

  get getApplyFilterButtonPO() {
    return (async () =>
      await Action.getPageObject(
        this._applyFilterButtonLocator
      ))();
  }

  get getCarTrimTextPO() {
    return (async () =>
      await Action.getPageObject(this._trimsTextLocator))();
  }

  get getCarMakeModelTextPO() {
    return (async () =>
      await Action.getPageObject(this._makeAndModelTextLocator, true))();
  }

  get getCheckMarksPO() {
    return (async () =>
      await Action.getPageObject(this._selectorCheckmarkLocator, true))();
  }

  get getCheckMarkPO() {
    return (async () =>
      await Action.getPageObject(this._selectorCheckmarkLocator, false, 0))();
  }

  get getAllSelectedTrimsPO() {
    return (async () =>
      await Action.getPageObject(this._selectAllTrimLocator, false, 0))();
  }

  get getBackToModelsButton() {
    return (async () =>
      await Action.getPageObject(this._backToModelsButtonLocator, false, 0))();
  }

  get getBackToMakesButton() {
    return (async () =>
      await Action.getPageObject(this._backToMakesButtonLocator, false, 0))();
  }

  async clickMakeAndModelButton() {
    await Action.performClick(await this.getCarMakeAndModelTabPO);
  }
  
  async clickApplyFilterButton() {
    await Action.performClick(await this.getApplyFilterButtonPO);
    await browser.pause(Constants.defaultWait);
  }

  async clickMake(name) {
    await Action.performClick(await this.make(name));
  }

  async clickModel(name) {
    await Action.performClick(await this.make(name));
  }

  async scrollToTop() {
    await Action.scrollToView(await this.getCarMakeLogoWrapperPO);
  }

  async make(name) {
    const makeAndModel = await Action.getPageObject(`.make-model-text=${name}`);
    return await makeAndModel.$('div');
  }

  async model(name) {
    return this.make(name);
  }

  async getObjectByText(text) {
    return await Action.getPageObject(`*=${text}`, false, 0);
  }

  async clickViewTrims() {
    await Action.performClick(await this.getCarTrimTextPO);
    await browser.pause(Constants.defaultWait);
  }

  async clickText(text) {
    await Action.performClick(await this.getObjectByText(text));
    await browser.pause(Constants.defaultWait);
  }

  async clickBackToMakeButton() {
    await Action.performClick(await this.getBackToMakesButton);
  }

  async clickBackToModelsButton() {
    await Action.performClick(await this.getBackToModelsButton);
  }

  async clickTrimCountByTrimText(text) {
    const trims = await Action.getPageObject(
      this._makeAndModelTextLocator,
      5000,
      true
    );
    // eslint-disable-next-line no-restricted-syntax
    for (const trim of trims) {
      const trimType = await trim.getText();
      if (trimType === text) {
        await Action.performClick(trim);
      }
    }
  }

  async getTrimCountByTrimText(text) {
    let count = 0;
    const trims = await this.getCarMakeModelTextPO;
    // eslint-disable-next-line no-restricted-syntax
    for (const trim of trims) {
      const trimType = await trim.getText();
      if (trimType === text) {
        count += 1;
      }
    }
    return count;
  }

  async isTextVisible(text) {
    return await Action.isPageObjectVisible(await this.getObjectByText(text));
  }

  async isSelectAllTrimsVisible() {
    return await Action.isPageObjectVisible(await this.getAllSelectedTrimsPO);
  }

  async countVisibleCheckMarks() {
    const checkMarks = await this.getCheckMarksPO;
    return checkMarks.length;
  }

  async isCheckMarkVisible() {
    return await Action.isPageObjectVisible(await this.getCheckMarkPO);
  }
  
  async isMakeAndModeldWrapperVisible() {
    return await Action.isPageObjectVisible(
      await await Action.getPageObject(
        Selector.getByQa('mobile-list'),
        false,
        0
      )
    );
  }
}

module.exports = new MakeAndModelFilter();
