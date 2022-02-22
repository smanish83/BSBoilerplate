class BodyFilter{
    _bodyButtonLocator = 'span=BODY';

    get getBodyButtonPO() {
        return (async () => await Action.getPageObject(this._bodyButtonLocator))();
      }
}

module.exports = new BodyFilter();
