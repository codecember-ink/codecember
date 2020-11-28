import posts from '../data/posts.json'
import { UserPost } from './types'

export const ALL_POSTS = posts as unknown as Record<string, UserPost[]>
