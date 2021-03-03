import Web3 from 'web3';

class Network {
  public writeWeb3: Web3 = null as any;

  public setWriteWeb3(web3: Web3) {
    this.writeWeb3 = web3;

    this.writeWeb3.eth.extend({
      methods: [
        {
          name: 'chainId',
          call: 'eth_chainId',
          outputFormatter: (this.writeWeb3.utils as any).hexToNumber,
        },
      ],
    });
  }

  sign(message: string, address: string) {
    return this.writeWeb3.eth.personal.sign(message, address, '');
  }
}

export const network = new Network();
