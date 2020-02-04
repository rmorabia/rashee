#! /usr/bin/env node

const https = require('https')
const chalk = require('chalk')
const argv = require('yargs')
  .command('sunsign', 'The most prominent and common sign you associate with horoscopes. Probably similar to "cancer" or "aquarius."')
  .help('help')
  .argv

const sunsign = argv && argv._[0] && argv._[0].toLowerCase()

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

if (!argv._[0]) {
  console.log(`${chalk.bold('Welcome to rashee!')}
Get your horoscope for today by running ${chalk.blue('npx rashee <sunsign>')}. Your sunsign is probably similar to ${chalk.green('taurus')} or ${chalk.keyword('purple')('sagittarius')}.
If you need help, run ${chalk.red('npx rashee help')}.
Thanks for using my silly little app. ${chalk.bold(':)')}`)
  process.exit()
}

if (!(sunsign in potentialSunsigns)) {
  console.log(`${chalk.bold('Uh oh!')} You entered a command that isn't a sunsign. Try running the app again with a valid sunsign, like ${chalk.white('cancer')} or ${chalk.blue('aquarius')}.`)
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
      `Hey there, beautiful ${symbol} ${name}! Here's your horoscope for today:`
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
