export interface IGenre {
  id: number,
  name: string,
  parentGenreId?: number,
  parentGenre?: IGenre,
  subGenres?: IGenre[]
}
