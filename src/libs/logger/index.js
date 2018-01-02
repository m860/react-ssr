import serverLogger from './logger.server'
import clientLogger from './logger.client'

export default __SERVER__ ? serverLogger : clientLogger

