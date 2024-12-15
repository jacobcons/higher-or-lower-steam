import jsdom from 'jsdom';
import { Octokit } from '@octokit/core';
const { JSDOM } = jsdom;
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

export async function main() {
  // get game data
  const URL_BASE = 'https://steamcharts.com/top/p.';
  const PAGES_TO_FETCH = 8;
  const urls = Array.from(
    { length: PAGES_TO_FETCH },
    (_, i) => `${URL_BASE}${i + 1}`,
  );
  const allGameData = (await Promise.all(urls.map(getDataFromPage))).flat();

  // upload to gist
  await octokit.request('PATCH /gists/{gist_id}', {
    gist_id: '98afc1384c066954b36bf86e16bb2c01',
    files: {
      'steam-game-data.json': {
        content: JSON.stringify(allGameData),
      },
    },
    headers: {
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });
}

async function getDataFromPage(url) {
  const res = await fetch(url);
  const txt = await res.text();
  const { document } = new JSDOM(txt).window;
  const rows = Array.from(document.querySelectorAll('#top-games tbody tr'));
  const gameData = rows.map((row) => {
    const link = row.querySelector('a');
    const id = link.href.split('/').at(-1);
    const name = link.textContent.trim();
    const currentPlayers = +row
      .querySelector('.num')
      .textContent.replace(',', '');
    return {
      id,
      name,
      currentPlayers,
    };
  });
  return gameData;
}

await main();
