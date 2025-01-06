const { create } = require('ipfs-http-client');


const ipfs = create({
  host: '127.0.0.1',
  port: '5001',
  protocol: 'http'
});

class IpfsModel {
  static async addFile(content) {
    const { path } = await ipfs.add(content);
    return path;
  }

  static async getFile(cid) {
    const chunks = [];
    for await (const chunk of ipfs.cat(cid)) {
      chunks.push(chunk);
    }
    return Buffer.concat(chunks).toString();
  }

  static async updateFile(cid, newContent) {
    await ipfs.pin.rm(cid);
    const { path } = await ipfs.add(newContent);
    return path;
  }

  static async deleteFile(cid) {
    await ipfs.pin.rm(cid);
  }
}

module.exports = IpfsModel;