const Page = require('../Page');
const VehicleTile = require('./resultTile/VehicleTile');
const MakeAndModelFacet = require('./facets/MakeAndModelFilter')

class Search extends Page {
  _paginationNextLocator = 'Cv.Search.Pagination.NextPageButton';
  _paginationPreviousLocator = 'Cv.Search.Pagination.PreviousPageButton';
  _paginationLastLocator = 'Cv.Search.Pagination.LastPageButton';
  _paginationFirstLocator = 'Cv.Search.Pagination.FirstPageButton';
  _searchInputLocator = Selector.getByCv('Cv.Search.keywordSearchInput');
  _goButtonLocator = Selector.getByCv('Cv.Search.keywordSearchInput.go');
  _paymentAndPriceButtonLocator = 'span*=PAYMENT & PRICE';
  _chatButtonLocator = Selector.getByQa('icon-button-container');
  _vehicleSearchResultCountLocator = Selector.getByQa('results-count-wrapper');
  _searchFilterButtonLocator = '[data-qa=search-filters-wrapper]>[data-qa=styled-chip]';
  _appliedSearchFiltersButtonLocator = '[data-qa="applied-filter-expanded-button"]';
  _resultSectionLocator = Selector.getByQa('results-section');
  _noResultWrapperLocator = Selector.getByQa('no-results-wrapper');
  _noResultTitleLocator = '[class*="ZeroResultSearchstyles"] [data-qa="title"]';
  _searchHeaderTagLocator = Selector.getByCv('Cv.Search.H1Tag');
  _similarResultsHeaderLocator = Selector.getByQa('similar-results-header');
  _similarResultsWrapperLocator = Selector.getByQa('similar-results-wrapper');
  _suggestedSearchRemoveButtonLocator = '[data-test="SuggestionWrapper"] > button';
  _suggestedSearchWrapperLocator = '[data-test="SuggestionWrapper"]';
  _sectionTitleLocator = '[data-test="SectionTitleWrapper"]';
  _paginationTextLocator = Selector.getByQa('pagination-text');
  _vehicleResultCountWrapperLocator = '[data-qa="results-count-wrapper"]>p';

  get vehicleTile() {
    return VehicleTile;
  }

  get makeAndModelFacet() {
    return MakeAndModelFacet;
  }

  get getSerchInputPO() {
    return (async () =>
      await Action.getPageObject(
        this._searchInputLocator
      ))();
  }

  get getGoButtonPO() {
    return (async () =>
      await Action.getPageObject(
        this._goButtonLocator
      ))();
  }

  get getPaymentAndPriceButtonPO() {
    return (async () => await Action.getPageObject(this._paymentAndPriceButtonLocator))();
  }

  get getCarvanaChatPO() {
    return (async () =>
      await Action.getPageObject(this._chatButtonLocator))();
  }

  get getResultCountWrapperPO() {
    return (async () =>
      await Action.getPageObject(this._vehicleSearchResultCountLocator))();
  }

  get getFilterButtonPO() {
    return (async () =>
      await Action.getPageObject(
        this._searchFilterButtonLocator
      ))();
  }

  get getAllAppliedFiltersPO() {
    return (async () =>
      await Action.getPageObject(
        this._appliedSearchFiltersButtonLocator,
        true
      ))();
  }

  get getNoResultTitlePO() {
    return (async () =>
      await Action.getPageObject(
        this._noResultTitleLocator
      ))();
  }

  get getNoResultWrapperPO() {
    return (async () =>
      await Action.getPageObject(
        this._noResultWrapperLocator,
        false,
        0
      ))();
  }

  get getResultSectionPO() {
    return (async () =>
      await Action.getPageObject(
        this._resultSectionLocator,
        false,
        0
      ))();
  }

  get getSearchHeaderPO() {
    return (async () =>
      await Action.getPageObject(
        this._searchHeaderTagLocator,
        false,
        0
      ))();
  }

  get getSimilarResultsHeaderPO() {
    return (async () =>
      await Action.getPageObject(
        this._similarResultsHeaderLocator,
        false,
        0
      ))();
  }

  get getSimilarResultsWraperPO() {
    return (async () =>
      await Action.getPageObject(
        this._similarResultsWrapperLocator,
        false,
        0
      ))();
  }

  get getSuggestedSearchesRemoveButtonPO() {
    return (async () =>
      await Action.getPageObject(
        this._suggestedSearchRemoveButtonLocator,
        true
      ))();
  }

  get getSuggestedSearchWrapperPO() {
    return (async () =>
      await Action.getPageObject(this._suggestedSearchWrapperLocator, true))();
  }

  get getSectionTitleWrapperPO() {
    return (async () =>
      await Action.getPageObject(this._sectionTitleLocator))();
  }

  get getCarTilesResultCountWrapperPO() {
    return (async () =>
      await Action.getPageObject(this._vehicleResultCountWrapperLocator))();
  }

  get getSearchPageTextWrapperPO() {
    return (async () =>
      await Action.getPageObject(this._paginationTextLocator))();
  }

  async clickPaymentAndPriceButton() {
    await Action.performClick(await this.getPaymentAndPriceButtonPO);
  }

  async waitForInitialSearchLoad() {
    await browser.pause(2000);
    await Action.waitForDisplayed(await this.vehicleTile.getResultTilePO);
  }

  async explicitSleep() {
    await browser.pause(Constants.defaultWait);
  }

  async clickGoButton() {
    return await Action.performClick(await this.getGoButtonPO);
  }

  async clickFilterButton() {
    await Action.performClick(await this.getFilterButtonPO);
  }

  async isFilterContains(value) {
    const filters = await this.getAllAppliedFiltersPO;

    for (let index = 0; index < filters.length; index += 1) {
      const filterText = await Action.getText(filters[index]);
      if (filterText.toLowerCase() === value.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  async searchForKeyword(vehicle) {
    await Action.setText(await this.getSerchInputPO, vehicle);
    await browser.pause(Constants.defaultWait);
  }

  async searchVehicle(vehicle) {
    await Action.setText(await this.getSerchInputPO, vehicle);
    await this.clickGoButton();
    await browser.pause(Constants.defaultWait);
    this.waitForInitialSearchLoad();
  }

  async clickOnSerchVehicleInputBox() {
    await Action.performClick(await this.getSerchInputPO);
  }

  async getNoResultViewText() {
    return await Action.getText(await this.getNoResultTitlePO);
  }

  async isNoResultFoundWrapperVisible() {
    return await Action.isPageObjectVisible(await this.getNoResultWrapperPO);
  }

  async isResultSectionExist() {
    return await Action.isPageObjectExisting(await this.getResultSectionPO);
  }

  async isSuggestedSearchDropDownContains(value) {
    const suggestedSearches = await this.getSuggestedSearchWrapperPO;

    for (let index = 0; index < suggestedSearches.length; index += 1) {
      const search = await Action.getText(suggestedSearches[index]);
      if (search.replace(' Remove', '').toLowerCase() === value.toLowerCase()) {
        return true;
      }
    }
    return false;
  }

  async removeSuggestedSearchFromDropDown(value) {
    const suggestedSearches = await this.getSuggestedSearchWrapperPO;
    const suggestedSearchesRemovebutton = await this
      .getSuggestedSearchesRemoveButtonPO;

    for (let index = 0; index < suggestedSearches.length; index += 1) {
      const search = await Action.getText(suggestedSearches[index]);
      if (search.replace(' Remove', '').toLowerCase() === value.toLowerCase()) {
        await Action.performClick(suggestedSearchesRemovebutton[index]);
        await browser.pause(Constants.defaultWait);
        return;
      }
    }
  }

  async suggestedSearchList(index = 0) {
    const suggestions = await this.getSuggestedSearchWrapperPO;
    const suggestionText = await Action.getText(suggestions[index]);
    return suggestionText;
    
  }

  async clickSuggestedSearchList(index) {
    const suggestions = await this.getSuggestedSearchWrapperPO;
    await performClick(suggestions[index], 0);
  }

  async suggestionDDSectionTitle() {
    const suggestionsTitle = await this.getSectionTitleWrapperPO;    
    return await Action.getText(suggestionsTitle);
  }

  async totalResultCount() {
    let count = await Action.getText(
      await this.getCarTilesResultCountWrapperPO
    );
    count = count.replace('RESULTS: ', '').replace(',', '');
    return count;
  }

  async searchPageText() {
    return await Action.getText(await this.getSearchPageTextWrapperPO);
  }

  async navSearchResultsPage(navButton) {
    let selector = '';
    switch (navButton) {
      case 'next':
        selector = this._paginationNextLocator;
        break;
      case 'previous':
        selector = this._paginationPreviousLocator;
        break;
      case 'last':
        selector = this._paginationLastLocator;
        break;
      case 'first':
        selector = this._paginationFirstLocator;
        break;
      default:
        selector = this._paginationNextLocator;
        break;
    }

    const navigationButton = await Action.getPageObject(
      Selector.getByCv(selector)
    );

    await Action.scrollToView(navigationButton);
    await Action.performClick(navigationButton);
    await browser.pause(Constants.defaultWait);
    await this.waitForInitialSearchLoad();
  }

  async isSearchH1tagVisible() {
    return await Action.isPageObjectVisible(await this.getSearchHeaderPO);
  }

  async isSimilarResultsHeaderVisible() {
    return await Action.isPageObjectVisible(
      await this.getSimilarResultsHeaderPO
    );
  }

  async isSimilarResultsWrapperVisible() {
    return await Action.isPageObjectVisible(
      await this.getSimilarResultsWraperPO
    );
  }

  async open(path = '') {
    return await super.open({
      path: `cars${path}`,
      exist: '#search-container',
    });
  }
}

module.exports = new Search();
