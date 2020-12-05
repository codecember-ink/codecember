import fs from 'fs'
import axios from 'axios'
import cheerio from 'cheerio'
import dayjs from 'dayjs'
import { UserPost } from '../src/types'

const TOKEN = process.env.TWITTER_TOKEN

const since_id = fs.readFileSync('data/last', 'utf-8')

async function getTweetSinceCursor(since_id: string) {
  try {
    const { data } = await axios(
      {
        method: 'GET',
        url: 'https://api.twitter.com/1.1/search/tweets.json',
        headers: {
          authorization: `Bearer ${TOKEN}`,
        },
        params: {
          q: '#codecember',
          result_type: 'recent',
          count: 200,
          since_id,
          tweet_mode: 'extended',
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
  const tags: string[] = (data.entities?.hashtags || []).map((i: any) => i.text?.toLowerCase()).filter(Boolean)
  const urls: string[] = (data.entities?.urls || []).map((i: any) => i.expanded_url).filter(Boolean)
  const media: string[] = (data.entities?.media || []).map((i: any) => i.media_url_https).filter(Boolean)
  const video: string[] = (data.extended_entities?.media || [])
    .flatMap((i: any) => (i.video_info?.variants || []).map((i: any) => i.url))
    .filter(Boolean)
  const text: string = data.text
  const user_id: string = data.user?.id_str
  const user_name: string = data.user?.name
  const user_handle: string = data.user?.screen_name
  const is_retweet = data.retweeted_status
  const href = `https://twitter.com/${user_handle}/status/${id}`

  return { id, href, created_at, tags, urls, media, video, text, user_id, user_name, user_handle, is_retweet, data }
}

async function resolveDate(data: ReturnType<typeof processData>): Promise<UserPost> {
  let media: string | undefined = data.media.slice(-1)[0]
  const video: string | undefined = data.video.slice(-1)[0]
  const dayFromTag = Number.parseInt(data.tags.find(i => i.startsWith('day'))?.slice(3) || '')

  if (!media && data.urls.length) {
    const url = data.urls.slice(-1)[0]
    try {
      const { data } = await axios.get(url, { responseType: 'text' })
      const $ = cheerio.load(data)
      const content = $('meta[property="og:image"]').attr('content')
      media = content
    }
    catch (e) {

    }
  }

  return {
    date: dayFromTag ? `2020/12/${dayFromTag}` : undefined,
    created_time: +dayjs(data.created_at),
    author_handle: data.user_handle,
    author: data.user_name,
    post_link: data.href,
    media_link: media,
    video_link: video,
    raw: data,
  }
}

async function fetch() {
  let tweets: any[] = []

  let last_id = since_id
  let i = 50
  while (i) {
    i -= 1
    const res = await getTweetSinceCursor(last_id)
    // fs.writeFileSync('data/raw.json', JSON.stringify(res, null, 2))
    last_id = res.search_metadata.max_id_str
    if (!last_id) {
      console.error('failed to fetch')
      return
    }
    console.log(`${res.statuses.length} tweets found`)
    if (!res.statuses.length)
      break

    tweets = [...tweets, ...res.statuses]
  }

  const processed = tweets.map(processData).filter(i => !i.is_retweet && i.user_handle !== 'codecember_ink')

  // fs.writeFileSync('data/processed.json', JSON.stringify(processed, null, 2))

  const resolved = await Promise.all(processed.map(resolveDate))

  // fs.writeFileSync('data/resolved.json', JSON.stringify(resolved, null, 2))

  const posts = JSON.parse(fs.readFileSync('data/posts.json', 'utf-8'))
  const triage = JSON.parse(fs.readFileSync('data/triage.json', 'utf-8'))

  resolved.forEach((r) => {
    if (!r.date && !r.media_link)
      return
    if (r.date && r.media_link) {
      const date = r.date
      if (!posts[date])
        posts[date] = []
      delete r.date
      delete r.raw

      const post = posts[date].find((i: any) => i.post_link === r.post_link)
      if (post)
        Object.assign(post, r)
      else
        posts[date].push(r)
    }
    else {
      if (triage.find((i: any) => i.post_link === r.post_link))
        return
      triage.push(r)
    }
  })

  fs.writeFileSync('data/posts.json', JSON.stringify(posts, null, 2), 'utf-8')
  fs.writeFileSync('data/triage.json', JSON.stringify(triage, null, 2), 'utf-8')
  fs.writeFileSync('data/last', last_id, 'utf-8')
}

fetch()
