import posts from '../data/posts.json'
import { UserPost } from './types'

export const ALL_POSTS = posts as unknown as Record<string, UserPost[]>

export const getPosts = (year: number, day: number) => {
  if (!year || !day)
    return []
  return ALL_POSTS[`${year}/12/${day}`] || []
}
