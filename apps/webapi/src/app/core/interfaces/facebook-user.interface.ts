export interface IFacebookPicture {
  data: {
    height: number,
    is_silhouette: boolean,
    url: string,
    width: string
  }
}

export interface IFacebookUser {
  id: string,
  email: string,
  name: string,
  first_name: string,
  last_name: string,
  picture?: IFacebookPicture
}
