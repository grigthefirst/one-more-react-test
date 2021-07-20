import { css } from 'emotion'
import React from 'react'
import { Link } from 'react-router-dom'

import { listPosts } from '../../api'
import { baseStyle, paddings } from '../commonStyles'
import { useAsyncData } from '../hooks/useAsyncData'

export interface PostListScreenProps {
  accessToken: string
}

export const PostListScreen: React.FC<PostListScreenProps> = props => {
  const { accessToken } = props
  const data = useAsyncData(async () => {
    if (!accessToken) {
      throw new Error('No access code')
    }
    return await listPosts(accessToken)
  }, [accessToken])

  return (
    <>
      {data.type === 'loading' && <div>Loading...</div>}
      {data.type === 'error' && <div>{data.error}</div>}
      {data.type === 'success' && (
        <ul className={css([rootStyle, baseStyle])}>
          {data.value.map(post => (
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
      )}
    </>
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
