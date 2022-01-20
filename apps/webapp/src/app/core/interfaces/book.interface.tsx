import { IAuthor } from "@core/interfaces/author.interface";

export interface IBook {
  id: number,
  amountPages: number,
  avgRate: number,
  description?: string,
  image: string,
  title: string,
  year: number,
  author?: IAuthor,
  authorId?: number,
  createdAt?: Date,
  authorFullName?: string,
  updatedAt?: Date
}
