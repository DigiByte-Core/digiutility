const digibyte = require('digibyte');

const Address = require('../lib/Address');

const testSeed = 'music radio witness crucial fever able lift action scrub sad brand easily';
const testHdKey = 'xprv9s21ZrQH143K4JL4aAvGqq4sk6AaRecxUacXtv3tMf2F1Pjpb9kXBh5ZeEZVRXcZfxW44UJbqws9vrGTR9NpTFjsJs66G8wGDhfHMmfDkvw';
const pairs = [
  {
    privKey: 'KwXi4EQkqnkLpLM6TEzia6wXSYarZQJJVbuPYqT7XnEnugWqQU18',
    address: 'dgb1qzyyhrj8p5gac6hqh55hd2g9xutef3ph8rx3pyw'
  }
]

describe('Address', () => {

  describe('deriveChildIndex', () => {
    it('Should derive the correct child', () => {
      const pair = Address.deriveChildIndex(testSeed, false, 0);
      expect(pair.address).toEqual('dgb1qghy4j2ngvuxcluz5ms26n7sgdxs5wefawulsn3');
    });
  });

  describe('getNewAddress', () => {
    it('Should get a new keypair', () => {
      const pair = Address.getNewAddress();
      expect(pair).toHaveProperty('privKey');
      expect(pair).toHaveProperty('address');
      expect(pair).toHaveProperty('privKey');
    });

    it('Should generate valid Private Key', () => {
      const pair = Address.getNewAddress();
      const privKey = pair.privKey;
      expect(digibyte.PrivateKey.isValid(privKey)).toEqual(true);
    })

    it('Should have DAP1 Prefix', () => {
      const pair = Address.getNewAddress();
      expect(pair.address).toMatch(/dgb1/); // todo dap1
    })
  })

  describe('getNewSeed', () => {
    it('Should get a new seed', () => {
      const seed = Address.getNewSeed();
      expect(typeof seed).toEqual('string');
    });
  });

  describe('getSeedBalance', () => {
    it('Should get balances for a seed', () => {
      return Address.getSeedBalance(testSeed).then(balances => {
        expect(typeof balances).toEqual('Array');
      });
    });
  });

  describe('addressFromPrivkey', () => {
    it('Should get correct address from Private Key', () => {
      const pair = Address.addressFromPrivkey(pairs[0].privKey);
      expect(pair.address).toEqual(pairs[0].address);
    });
  });

  describe('seedToHdKey', () => {
    it('Should generate Correct HD Private Key from seed', () => {
      const hdPrivKey = Address.seedToHdKey(testSeed);
      expect(hdPrivKey.xprivkey).toEqual(testHdKey);
    });
  });
})