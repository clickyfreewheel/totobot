const debug = require('debug')('bot:totodile')
const Discord = require('discord.js')
const path = require('path')
const fs = require('fs')

const commando = require('discord.js-commando')
const oneLine = require('common-tags').oneLine

module.exports = class Totodile extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'totodile',
      aliases: ['toto', '158'],
      group: 'pictures',
      memberName: 'totodile',
      description: 'Show me a Totodile',
      details: oneLine`
      `,
      examples: ['totodile']
    })

    this.IMAGE_DIR = path.join(__dirname, 'totodile')
  }

  async run(msg, args) {
    try {
      const files = await this.getImages()
      const file = this.getRandom(files)
      const image = new Discord.Attachment(path.join(this.IMAGE_DIR, file))
      return msg.channel.send(image)
    } catch (err) {
      return msg.channel.send(err.message)
    }
  }

  /**
   * Read in images dir
   *
   * @returns {Promise<array>}
   */
  async getImages() {
    return new Promise((resolve, reject) => {
      fs.readdir(this.IMAGE_DIR, (err, files) => {
        if (err) {
          reject(err)
        }
        resolve(files)
      })
    })
  }

  getRandom(files) {
    return files[Math.floor(Math.random() * files.length)]
  }
}
