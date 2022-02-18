export interface IBookForm {
  title: string,
  amountPages: number,
  year: number,
  genres: number[],
  description: string,
  author?: number,
  imageUrl?: string,
  imageFile?: File
}
