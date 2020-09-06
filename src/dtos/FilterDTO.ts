class FilterDTO {
  size: number;
  page: number;

  constructor(req?: any) {
    this.page = parseInt((req.query.page || 0).toString());
    this.size = parseInt((req.query.size || 10).toString());
  }
}

export default FilterDTO;
