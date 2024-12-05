class Book {
  constructor(data) {
    this.id = data.id;
    this.userId = data.userId;
    this.moduleCode = data.moduleCode;
    this.publisher = data.publisher;
    this.price = data.price;
    this.pages = data.pages;
    this.status = data.status;
    this.photo= data.photo || "";
    this.comments=data.comments || "";
    this.soldDate=data.soldDate || "";
  }
  toString() {
    return (
      this.id +
      ", " +
      this.userId +
      ", " +
      this.moduleCode +
      ", " +
      this.publisher +
      ", " +
      this.price +
      ", " +
      this.pages +
      ", " +
      this.status +
      ", " +
      this.photo +
      ", " +
      this.comments +
      ", " +
      this.soldDate
    );
  }
}
export default Book;