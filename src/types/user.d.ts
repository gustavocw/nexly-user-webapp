interface Sigin {
  email: string;
  password: string;
}

interface User {
  name: string;
  lastname: string;
  phone: string;
  cpf: string;
  bio: string;
  email?: string;
  sex: string;
  photo?: string;
  lastAccess?: string;
  _id?: string;
  address?: Address;
}

interface Address {
  _id?: string;
  codeStreet: string;
  street: string;
  number: string;
  complement: string;
  city: string;
  uf: string;
}
