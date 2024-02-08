class ApiFeactures {
  constructor(query, queryStr) {
    // new ApiFeactures(Url.find(), req.query)
    this.query = query;
    this.queryStr = queryStr;
  }

  filter() {
    let queryString = JSON.stringify(this.queryStr);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte|in)\b/g,
      (match) => `$${match}`
    );
    const queryObj = JSON.parse(queryString);

    this.query = this.query.find(queryObj);
    return this;
  }

  // localhost:3000/api/v1/url?sort=-createdAt,clickCount

  sort() {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.split(',').join(' ');
      console.log(sortBy);
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('-createdAt');
    }
    return this;
  }

  limitFields() {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.split(',').join(' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }
    return this;
  }

  paginate() {
    //pagination
    // localhost:3000/api/v1/url?page=2&limit=10
    // if (this.queryStr.page) {
    //   const total = await Url.countDocuments();
    //   if (skip >= total) {
    //     const err = new CustomError('This page does not exist', 404);
    //     return next(err);
    //   }
    // }
    const page = this.queryStr.page * 1 || 1;
    const limit = this.queryStr.limit * 1 || 10;
    const skip = (page - 1) * limit;
    this.query = this.query.skip(skip).limit(limit);
    return this;
  }
}

module.exports = ApiFeactures;
