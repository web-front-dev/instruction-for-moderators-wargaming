import React, { FC, useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userNameSelector } from 'selectors/authSelectors'
import {
  isSubmittingSelector,
  commentsSelector,
} from 'selectors/commentSelectors'
import { actions } from 'store/commentReducer'
import { Form, Input } from 'antd'
import moment from 'moment'
import { DispatchType } from 'store'
import CommentButton from 'components/comment/CommentButton'
import { setUserComment } from 'helpers'

const { TextArea } = Input

const CommentForm: FC = () => {
  const [message, setMessage] = useState<string>('')
  const dispatch = useDispatch<DispatchType>()
  const name = useSelector(userNameSelector)
  const comments = useSelector(commentsSelector)
  const isSubmitting = useSelector(isSubmittingSelector)

  const handleSubmit = useCallback(() => {
    const date = moment().format('L')

    if (!message) {
      return
    }

    dispatch(actions.setIsSubmitting(true))
    dispatch(
      actions.setComment(setUserComment(name, message, comments.length, date))
    )
    dispatch(actions.setIsSubmitting(false))
    setMessage('')
  }, [dispatch, message, name, comments])

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const message = String(e.target.value)
      setMessage(message)
    },
    []
  )

  return (
    <div>
      <Form.Item>
        <TextArea rows={4} onChange={handleChange} value={message} />
      </Form.Item>
      <CommentButton isSubmitting={isSubmitting} handleSubmit={handleSubmit} />
    </div>
  )
}

export default CommentForm
