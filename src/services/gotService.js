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

    getAllBooks= async () => {
        const res = await this.getResource(`/books?pageSize=12`);
        return res.map(this._transformBook);
    }
    
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}/`);
        return this._transformBook(book)
    }
    
    getAllCharacters = async () => {
        const page = Math.floor(Math.random()*76 + 5);
        const res = await this.getResource(`/characters?page=${page}&pageSize=7`);
        return res.map(this._transformCharacter);
        
    }
    
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }
    
    getAllHouses= async () => {
        const page = Math.floor(Math.random()*54 + 1);
        const res = await this.getResource(`/houses?page=${page}&pageSize=7`);
        return res.map(this._transformHouse);
    }
    
    
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}/`);
        return this._transformHouse(house);
    }
    isSet(data) {
        if (data) {
            return data
        } else {
            return <span style={{color: "red"}}>unknown</span>
        }
    }

    _transformCharacter = (char) => {
        return {
            id: char.url.match(/\d/g).join(''),
            name: this.isSet(char.name),
            gender: this.isSet(char.gender),
            born: this.isSet(char.born),
            died: this.isSet(char.died), 
            culture: this.isSet(char.culture)
        };
    }

    _transformHouse = (house) => {
        return {
            id: house.url.match(/\d/g).join(''),
            name: this.isSet(house.name),
            region: this.isSet(house.region),
            words: this.isSet(house.words),
            titles: this.isSet(house.titles),
            ancestralWeapons: this.isSet(house.ancestralWeapons),
        };
    }
    
    _transformBook = (book) => {
        return {
            id: book.url.match(/\d/g).join(''),
            name: this.isSet(book.name),
            numberOfPages: this.isSet(book.numberOfPages),
            publisher: this.isSet(book.publisher),
            released: this.isSet(book.released)
        };
    }
}