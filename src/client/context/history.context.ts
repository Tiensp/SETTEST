import { createContext } from 'react'
import { HistoryModel } from '../../shared/models/history.model'

const defaultHistory = {
	history: [],
}

const HistoryContext = createContext<HistoryModel>(defaultHistory)

export default HistoryContext
