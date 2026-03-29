// This is just a schema reference; MongoDB is schema-less
export default class User {
  constructor({ email, password, nickname }) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}