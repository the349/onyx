'use strict'

module.exports = {

  handleUpdateClothing: (data, client) => {
    const type = data[1].substr(2)
    const item = parseInt(data[3])

    const types = {
      'upc': 'color',
      'uph': 'head',
      'upf': 'face',
      'upn': 'neck',
      'upb': 'body',
      'upa': 'hand',
      'upe': 'feet',
      'upl': 'pin',
      'upp': 'photo'
    }

    if (item !== 0 && !client.inventory.includes(item)) return

    if (types[type]) {
      client.room.sendXt(type, -1, client.id, item)
      client.updateOutfit(types[type], item)
    }
  },

  // CUSTOM HANDLERS

  handleUpdateOutfit: (data, client) => {
    const outfit = data[3]

    try {
      client.setCrumb('outfit', JSON.parse(outfit))
      client.room.sendXt('upo', -1, client.id, JSON.stringify(client.getCrumb('outfit')))
    } catch (error) {
      /// // handle error
    }
  },

  handleUpdateCard: (data, client) => {
    const hue = parseInt(data[3])

    if (!isNaN(hue)) {
      client.setCrumb('cardHue', hue)
      client.room.sendXt('upu', -1, client.id, hue)
    }
  },

  handleUpdateMood: (data, client) => {
    let mood = data[3]

    if (!mood) return

    if (mood.includes('"')) {
      mood = mood.split('"').join('')
    }

    if (mood.includes('<') && mood.includes('>')) {
      mood = mood.split('<').join('')
      mood = mood.split('>').join('')
    }

    client.setCrumb('mood', mood)
    client.room.sendXt('upm', -1, client.id, mood)
  },

  handleUpdateSpeed: (data, client) => {
    let speed = parseInt(data[3])

    if (speed > 120) speed = 120
    if (speed < 0) speed = 0

    client.setCrumb('speed', speed)
    client.room.sendXt('ups', -1, client.id, speed)
  },

  handleUpdateBeak: (data, client) => {
    const beak = parseInt(data[3])

    if (!isNaN(beak)) {
      client.setCrumb('beak', beak)
      client.room.sendXt('upk', -1, client.id, client.getCrumb('beak'))
    }
  },

  handleUpdateBubbleColor: (data, client) => {
    const bubbleColor = data[3]
    const bubbleText = data[4]

    if (/^0x[0-9A-F]{6}$/i.test(bubbleColor) !== false) { client.setCrumb('bubbleColor', bubbleColor) } else { client.setCrumb('bubbleColor', '') }

    if (/^0x[0-9A-F]{6}$/i.test(bubbleText) !== false) { client.setCrumb('bubbleText', bubbleText) } else { client.setCrumb('bubbleText', '') }

    client.room.sendXt('ubc', -1, client.id, bubbleColor, bubbleText)
  },

  handleUpdateNameGlow: (data, client) => {
    const nameColor = data[3]
    const nameGlow = data[4]

    if (/^0x[0-9A-F]{6}$/i.test(nameColor) !== false) { client.setCrumb('nameColor', nameColor) } else { client.setCrumb('nameColor', '') }

    if (/^0x[0-9A-F]{6}$/i.test(nameGlow) !== false) { client.setCrumb('nameGlow', nameGlow) } else { client.setCrumb('nameGlow', '') }

    client.room.sendXt('ung', -1, client.id, nameColor, nameGlow)
  }
}
