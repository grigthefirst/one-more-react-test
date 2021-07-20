import { css } from 'emotion'
import React from 'react'
import { useParams } from 'react-router'

import { retrievePost } from '../../api'
import { paddings } from '../commonStyles'
import { useAsyncData } from '../hooks/useAsyncData'

export interface PostDetailsScreenProps {
  accessToken: string
}

interface PostDetailsScreenRouteParams {
  postId: string
}

export const PostDetailsScreen: React.FC<PostDetailsScreenProps> = props => {
  const params = useParams<PostDetailsScreenRouteParams>()
  const postId = parseInt(params.postId)

  const { accessToken } = props

  const data = useAsyncData(async () => {
    if (!accessToken) {
      throw new Error('No access code')
    }
    if (!postId) {
      throw new Error('No post id')
    }
    return await retrievePost(accessToken, postId)
  }, [accessToken])

  //TODO think of adding backend ids to comments
  return (
    <>
      {data.type === 'loading' && <div>Loading...</div>}
      {data.type === 'error' && <div>{data.error}</div>}
      {data.type === 'success' && (
        <div className={rootStyle}>
          <h1>{data.value.title}</h1>
          <div className={metaStyle}>
            <i>
              Created: {data.value.createdAt.toLocaleString()}
              {'\u00A0'}
            </i>
            <span role="img" aria-label="like">
              👍
            </span>
            {data.value.likes}
          </div>
          <p>{data.value.text}</p>
          <div className={commentsStyle}>
            <h3>Comments</h3>
            {data.value.comments.map((comment, index) => (
              <div className={commentsStyle} key={index}>
                {comment.text} - <i>{comment.author}</i>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

const rootStyle = css``
const metaStyle = css``
const commentsStyle = css`
  margin: ${paddings.m} 0;
`
