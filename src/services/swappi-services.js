const swapiServise = {
  _apiBase: "https://swapi.dev/api",

  async getResponse(url) {
    const res = await fetch(`${this._apiBase}${url}`);
    if (!res.ok) {
      throw new Error("ошибка");
    }
    const body = await res.json();
    return body;
  },

  async getAllPeople() {
    const res = await this.getResponse(`/people/`);
    return res.results;
  },

  getPerson(id) {
    return this.getResponse(`/people/${id}/`);
  },

  async getAllPlanet() {
    const res = await this.getResponse(`/planets/`);
    return res.results;
  },
};

export default swapiServise;
