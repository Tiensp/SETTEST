import http from '../apis/http-common'
import { HistoryModel } from '../../shared/models/history.model'

const getAll = () => http.get('/history')

const create = (data: HistoryModel) => http.post<HistoryModel>('/history', data)

const update = (data: HistoryModel) => http.put<any>(`/history`, data)

const removeAll = () => http.delete<any>(`/history`)

const historyService = {
	getAll,
	create,
	update,
	removeAll,
}

export default historyService
