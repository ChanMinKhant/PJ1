class ApiFeactures {
  constructor(query, queryStr) {
    // new ApiFeactures(Url.find(), req.query)
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    // create a copy of the query string object
    let queryObj = { ...this.queryStr };
    // remove the fields that are not related to filtering
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);
    // replace the operators with MongoDB syntax
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    // parse the string back to an object
    queryObj = JSON.parse(queryString);

    // apply the filter to the query
    this.query = this.query.find(queryObj);
    return this;
  }

  // localhost:3000/api/v1/url?sort=-createdAt,clickCount

  sort() {
    if (this.queryStr.sort) {
      // split the sort string by comma and join by space
      const sortBy = this.queryStr.sort.split(',').join(' ');
      // apply the sort to the query
      this.query = this.query.sort(sortBy);
    } else {
      // use a default sort by createdAt in descending order
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      // split the fields string by comma and join by space
      const fields = this.queryStr.fields.split(',').join(' ');
      // apply the projection to the query
      this.query = this.query.select(fields);
    } else {
      // exclude the __v field by default
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    //pagination
    // localhost:3000/api/v1/url?page=2&limit=10
    // get the page and limit from the query string or use default values
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 10;
    // calculate the number of documents to skip
    const skip = (page - 1) * limit;
    // apply the pagination to the query
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeactures;
