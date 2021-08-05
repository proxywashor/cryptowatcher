export class User {
  constructor (readonly rpc: string, readonly network: string, readonly pk: string[], readonly userName: string, readonly address: string) {
    this.rpc = rpc;
    this.network = network;
    this.pk = pk;
    this.userName = userName;
    this.address = address;
  }
}
