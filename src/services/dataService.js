class dataService {
  _apiBase = "http://localhost:3000";
  getData = async url => {
    const res = await fetch(`${this._apiBase}${url}`);
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
    const data = await this.getData(
      `/books?_page=${pageNumber}&_limit=${pageSize}`
    );
    return data;
  };
}

export default dataService;
