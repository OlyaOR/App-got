export default class GotService {
    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
    
        if (!res.ok) {
          throw new Error(`Could not fetch ${url}` +
            `, received ${res.status}`);
        }
        return await res.json();
    }

    async getAllBooks() {
        const res = await this.getResource(`/books/`);
        return res.map(this._transformBook);
    }
    
    async getBook(id) {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book)
    }
    
    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
        
    }
    
    async getCharacter (id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    async getAllHouses() {
        const res = await this.getResource(`/houses/`);
        return res.map(this._transformHouse);
    }
    
    
    async getHouse(id) {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }
    isData(data) {
        if (data) {
            return data
        } else {
            return <span style={{color: "red"}}>unknown</span>
        }
    }
    
    _transformCharacter(char) {
        return {
            name: this.isData(char.name),
            gender: this.isData(char.gender),
            born: this.isData(char.born),
            died: this.isData(char.died),
            culture: this.isData(char.culture)
        }
    }

    _transformHouse(house) {
        return {
            name: this.isData(house.name),
            region: this.isData(house.region),
            words: this.isData(house.words),
            titles: this.isData(house.titles),
            overlord: this.isData(house.overlord),
            ancestralWeapons: this.isData(house.ancestralWeapons)
        };
    }
    
    _transformBook(book) {
        return {
            name: this.isData(book.name),
            numberOfPages: this.isData(book.numberOfPages),
            publiser: this.isData(book.publiser),
            released: this.isData(book.released)
        };
    }
}
