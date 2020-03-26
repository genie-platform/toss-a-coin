const router = require('express').Router()
const request = require('request-promise-native')
const config = require('config')

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

router.post('/toss', async (req, res, next) => {
  const won = getRandomInt(4) == 0
  if (won) {
    const winnerId = getRandomInt(1000).toString()
    await request.post(`${config.get('crypto.apiBase')}/prizes`, {
      headers: {
        "Authorization": `Bearer ${config.get('crypto.jwt')}`
      },
      json: true,
      body: {
        won,
        winnerId
      }
    })
    return res.json({ data: {
      won,
      winnerId 
    }})
  }
  return res.json({ data: {
      won
  }})
})

router.post('/claim', async (req, res, next) => {
  const {winnerId, winnerAccountAddress } = req.body
  await request.post(`${config.get('crypto.apiBase')}/prizes/claim`, {
    headers: {
      "Authorization": `Bearer ${config.get('crypto.jwt')}`
    },
    json: true,
    body: {
      winnerId,
      winnerAccountAddress
    }
  })
  return res.send()
})

router.get('/prize', async (req, res, next) => {
  const response = await request.get(`${config.get('crypto.apiBase')}/prizes/nextPrize/`, {
    headers: {
      "Authorization": `Bearer ${config.get('crypto.jwt')}`
    }
  })
  console.log({ response })
  return res.send(response)
})

module.exports = router