export type UserPostFrom = 'twitter'
export type SourceLinkType = 'github' | 'gitlab' | 'codepen' | 'codesandbox' | 'glitch' | 'shadertoy' | 'other'

export interface UserPost {
  from: UserPostFrom
  created_time?: string
  post_link: string
  title?: string
  media_link?: string
  source_link?: string
  source_type?: SourceLinkType
  demo_link?: string
  author?: string
  author_handle?: string
}
