class DataService {
  _apiBase = "http://localhost:3000";
  getData = async (url, data = null) => {
    const res = await fetch(`${this._apiBase}${url}`, data);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, recieved ${res.status}`);
    }
    return await res.json();
  };
  getAllBooks = async () => {
    const data = await this.getData("/books");
    return data;
  };
  getBooksByPage = async (pageNumber, pageSize) => {
    try {
      const data = await this.getData(
        `/books?_page=${pageNumber}&_limit=${pageSize}`
      );
      return data;
    } catch (err) {
      return Promise.reject("err");
    }
  };
  updateBook = async (id, data) => {
    const book = await this.getData(`/books/${id}`);
    const newBook = { ...book, ...data };
    const updatedBook = await this.getData(`/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newBook)
    });
    return updatedBook;
  };
}

export default DataService;
