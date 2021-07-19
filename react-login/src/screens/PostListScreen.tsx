import { css } from 'emotion'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { listPosts, Post } from '../../api'
import { baseStyle, paddings } from '../commonStyles'

export interface PostListScreenProps {
  accessToken: string
}

export const PostListScreen: React.FC<PostListScreenProps> = props => {
  const { accessToken } = props
  const [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    if (accessToken) {
      listPosts(accessToken)
        .then(res => {
          setPosts(res)
        })
        .catch(err => console.error(err))
    }
  }, [accessToken])

  return (
    <ul className={css([rootStyle, baseStyle])}>
      {posts.map(post => (
        <li className={liStyle} key={post.id}>
          <Link to={`/post/${post.id}`} className={linkStyle}>
            {post.title}{' '}
            <span role="img" aria-label="like">
              👍
            </span>
            {post.likes}
          </Link>
        </li>
      ))}
    </ul>
  )
}

const rootStyle = css`
  list-style-type: none;
  padding: 0;
  margin: 0;
`
const liStyle = css`
  padding: ${paddings.m};
`
const linkStyle = css`
  text-decoration: none;
`
