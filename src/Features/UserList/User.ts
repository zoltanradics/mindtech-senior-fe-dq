
export type User = {
  name: string;
  email: string;
  username: string;
  company: string;
}

export type UserDto = {
  id: number,
  name: string
  username: string,
  email: string,
  address: {
    street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
      lat: string,
      lng: string
    }
  },
  phone: string,
  website: string,
  company: {
    name: string,
    catchPhrase: string,
    bs: string
  }
}