const Explorer = require('../lib/Explorer');

const ADDRESS = 'dgb1qlpkv4rr0ae8vjgde9rdunnpa4vyxrvyqeczzn9';

describe('Explorer', () => {

  describe('getBalance', () => {
    it('Should get an addresses balance', () => {
      return Explorer.getBalance(ADDRESS).then(addr => {
        expect(addr.balance).toEqual('0');
      });
    });
  });

  describe('getUtxos', () => {
    it('Should get an array of utxos', () => {
      return Explorer.getUtxos(ADDRESS).then(utxos => {
        expect(utxos).toEqual([]);
      });
    })
  })
});
