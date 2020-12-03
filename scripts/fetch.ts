import fs from 'fs'
import axios from 'axios'

const TOKEN = process.env.TWITTER_TOKEN

const since_id = '1333453991808647180'

async function getTweetSinceCursor(query = '') {
  try {
    const { data } = await axios(
      {
        method: 'GET',
        url: `https://api.twitter.com/1.1/search/tweets.json${query}`,
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        params: {
          q: '#codecember',
          result_type: 'recent',
          count: 200,
          since_id,
        },
      },
    )
    return data
  }
  catch (err) {
    console.error(err)
  }
}

function processData(data: any) {
  const id: string = data.id_str
  const created_at: string = data.created_at
  const tags: string[] = (data.entities?.hashtags || []).map((i: any) => i.text).filter(Boolean)
  const urls: string[] = (data.entities?.urls || []).map((i: any) => i.expanded_url).filter(Boolean)
  const media: string[] = (data.entities?.media || []).map((i: any) => i.media_url_https).filter(Boolean)
  const text: string = data.text
  const user_id: string = data.user?.id_str
  const user_name: string = data.user?.name
  const user_handle: string = data.user?.screen_name
  const retweet_id = data.retweeted_status?.id_str
  const href = `https://twitter.com/${user_handle}/status/${id}`

  return { id, href, created_at, tags, urls, media, text, user_id, user_name, user_handle, retweet_id }
}

async function fetch() {
  let tweets: any[] = []

  // let next_result = -1
  // while (next_cursor !== 0) {
  // console.log(`Getting tweets from cursor: ${next_cursor}`)
  const res = await getTweetSinceCursor()
  // next_cursor = res.next_cursor

  console.log(`${res.statuses.length} tweets found`)

  tweets = [...tweets, ...res.statuses]
  // }
  fs.writeFileSync('raw.json', JSON.stringify(tweets, null, 2))

  let processed = tweets.map(processData)
  const ids = processed.map(i => i.id)

  processed = processed.filter(i => !i.retweet_id || !ids.includes(i.retweet_id))

  fs.writeFileSync('processed.json', JSON.stringify(processed, null, 2))
}

fetch()
