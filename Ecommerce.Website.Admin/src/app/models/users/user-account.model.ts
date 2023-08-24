export class UserAccount {
  private username: string;
  private password: string;

  constructor(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setPassword(password: string) {
    this.password = password;
  }
}
