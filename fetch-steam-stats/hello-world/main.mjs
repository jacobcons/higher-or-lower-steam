import jsdom from 'jsdom'
const { JSDOM } = jsdom;

export async function main() {
  const URL_BASE = 'https://steamcharts.com/top/p.'
  const PAGES_TO_FETCH = 2
  const urls = Array.from({ length: PAGES_TO_FETCH }, (_, i) => `${URL_BASE}${i + 1}`)
  const allGameData = (await Promise.all(urls.map(async url => {
    const res = await fetch(url)
    const txt = await res.text()
    const { document } = (new JSDOM(txt)).window
    const rows = Array.from(document.querySelectorAll('#top-games tbody tr'))
    const gameData = rows.map(row => {
      const link = row.querySelector('a')
      const id = link.href.split('/').at(-1)
      const name = link.textContent.trim()
      const currentPlayers = +row.querySelector('.num').textContent.replace(',', '')
      return {
        id,
        name,
        currentPlayers
      }
    })
    return gameData
  }))).flat()
  console.log(allGameData)
  console.log(allGameData.length)
}

await main();