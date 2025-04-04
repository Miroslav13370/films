const sendApi = {
  _baseUrl: "https://api.themoviedb.org/3/search/movie?query=",
  _serch: "big",
  _page: "10",

  async getRespons(url, serh, page) {
    try {
      const response = await fetch(
        `${url}${serh}&include_adult=false&language=en-US&page=${page}`,
        {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYTM0NzQxMDJiNjgzMmY1MTQ4NjA2MDRmOWE5YmE5OSIsIm5iZiI6MTc0MjY3NjMwMi45MzQsInN1YiI6IjY3ZGYyMTRlMjEwZmE4MGEwZjRkODEyYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NTep8uYhcMawKyQJoGlOztmHCwEPOrDrSIPZ7qm6VlI",
          },
        },
      );
      const jsonApi = await response.json();
      return jsonApi;
    } catch (e) {
      console.log("ошибка");
      return null;
    }
  },

  async getApi(serch = "film", page1 = "1") {
    try {
      if (!serch) {
        const resilt = await this.getRespons(this._baseUrl, "film", page1);
        return resilt;
      }
      const resilt = await this.getRespons(this._baseUrl, serch, page1);
      return resilt;
    } catch (e) {
      console.log("ошибка");
      return null;
    }
  },
};

export default sendApi;
