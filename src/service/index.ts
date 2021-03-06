import axios from 'axios'
import { REACT_APP_API } from 'config'
import { CommentType } from 'types/comment/CommentTypes'
import { ResponseType } from 'types/service/ServiceTypes'

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export const instance = axios.create({
  baseURL: REACT_APP_API,
})

export const commentAPI = {
  getComments() {
    return instance
      .get<ResponseType<CommentType[]>>('comments')
      .then(({ data }) => data)
  },
  setComment(comment: CommentType) {
    return instance
      .post<void>('comment', { comment: comment })
      .then(({ data }) => data)
  },
  changeComment(id: string) {
    return instance
      .put<void>('comment', { params: { id } })
      .then(({ data }) => data)
  },
  deleteComment(id: string) {
    return instance
      .delete<void>('comment', { params: { id } })
      .then(({ data }) => data)
  },
  changeUserName(newName: string) {
    return instance
      .put<void>('name', { params: { newName } })
      .then(({ data }) => data)
  },
  deleteUserName() {
    return instance.delete<void>('name').then(({ data }) => data)
  },
  setAvatar(avatar: string) {
    return instance.post<void>('avatar', { avatar }).then(({ data }) => data)
  },
  changeAvatar(avatar: string) {
    return instance.put<void>('avatar', { avatar }).then(({ data }) => data)
  },
  deleteAvatar(avatar: string) {
    return instance
      .delete<void>('avatar', { params: { avatar } })
      .then(({ data }) => data)
  },
  setPassword(password: string) {
    return instance
      .post<void>('password', { password })
      .then(({ data }) => data)
  },
  changePassword(password: string) {
    return instance.put<void>('password', { password }).then(({ data }) => data)
  },
}
