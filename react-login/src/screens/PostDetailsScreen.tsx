import { css } from 'emotion'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { Post, retrievePost } from '../../api'
import { paddings } from '../commonStyles'

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

  const [post, setPost] = useState<Post | null>(null)
  useEffect(() => {
    if (accessToken && postId) {
      retrievePost(accessToken, postId)
        .then(result => setPost(result))
        .catch(err => console.error(err))
    }
  }, [accessToken, postId])
  //TODO think of adding backend ids to comments
  return (
    <div className={rootStyle}>
      <h1>{post?.title}</h1>
      <div className={metaStyle}>
        <i>
          Created: {post?.createdAt.toLocaleString()}
          {'\u00A0'}
        </i>
        <span role="img" aria-label="like">
          👍
        </span>
        {post?.likes}
      </div>
      <p>{post?.text}</p>
      <div className={commentsStyle}>
        <h3>Comments</h3>
        {post?.comments.map((comment, index) => (
          <div className={commentsStyle} key={index}>
            {comment.text} - <i>{comment.author}</i>
          </div>
        ))}
      </div>
    </div>
  )
}

const rootStyle = css``
const metaStyle = css``
const commentsStyle = css`
  margin: ${paddings.m} 0;
`
