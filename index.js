const https = require('https')
const chalk = require('chalk')
const argv = require('yargs')
  .command('sunsign', "sunsign to get today's horoscope for")
  .argv.help('help')
  .help('help')

const sunsign = argv._[0].toLowerCase()

const potentialSunsigns = {
  aries: {
    symbol: '\u2648',
    color: 'red'
  },
  taurus: {
    symbol: '\u2649',
    color: 'green'
  },
  gemini: {
    symbol: '\u264a',
    color: 'yellow'
  },
  cancer: {
    symbol: '\u264b',
    color: 'white'
  },
  leo: {
    symbol: '\u264c',
    color: 'gold'
  },
  virgo: {
    symbol: '\u264d',
    color: 'olive'
  },
  libra: {
    symbol: '\u264e',
    color: 'orchid'
  },
  scorpio: {
    symbol: '\u264f',
    color: 'black'
  },
  sagittarius: {
    symbol: '\u2650',
    color: 'purple'
  },
  capricorn: {
    symbol: '\u2651',
    color: 'rosybrown'
  },
  aquarius: {
    symbol: '\u2652',
    color: 'blue'
  },
  pisces: {
    symbol: '\u2653',
    color: 'springgreen'
  }
}

if (!(sunsign in potentialSunsigns)) {
  console.log('Please enter a valid sunsign.')
  process.exit()
}

const horoscopeAPI = {
  hostname: 'aztro.sameerkumar.website',
  port: 443,
  path: `/?sign=${sunsign}&day=tomorrow`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  }
}

const getHoroscope = https.request(horoscopeAPI, response => {
  response.on('data', data => {
    const parsedHoroscope = JSON.parse(data)
    const color = potentialSunsigns[sunsign].color
    const symbol = potentialSunsigns[sunsign].symbol
    const horoscope = parsedHoroscope.description
    const mood = parsedHoroscope.mood
    const name = sunsign.charAt(0).toUpperCase() + sunsign.slice(1)

    console.log(
      `Hey there, beautiful ${chalk.bgKeyword(color)(
        symbol
      )} ${name}! Here's your horoscope for today:`
    )
    console.log(chalk.keyword(color)(horoscope))
    console.log(chalk.keyword(color).inverse(`Feeling ${mood}`))
  })
})

getHoroscope.on('error', error =>
  console.log(`Uh oh! Your request failed. Please try again. Here is your error:
${error}`)
)

getHoroscope.end()
