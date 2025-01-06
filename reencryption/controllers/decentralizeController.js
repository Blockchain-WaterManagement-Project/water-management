const IpfsModel = require('../model/decentralizeModel');
const fs = require('fs'); 

class IpfsController {
  static async addFile(req, res) {
    try {
      const { content } = req.body;
      const cid = await IpfsModel.addFile(content);
      console.log(cid);
      res.status(201).json({ cid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getFile(req, res) {
    try {
      const { cid } = req.params;
      const content = await IpfsModel.getFile(cid);
      res.status(200).json({ content });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updateFile(req, res) {
    try {
      const { cid } = req.params;
      const { newContent } = req.body;
      const newCid = await IpfsModel.updateFile(cid, newContent);
      res.status(200).json({ newCid });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  static async deleteFile(req, res) {
    try {
      const { cid } = req.params;
      await IpfsModel.deleteFile(cid);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = IpfsController;
