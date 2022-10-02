import axios from 'axios'
import {logInfo} from '../helpers/print-log';

export default class ExampleService {
  static async fetchData({ page = 0, numPerPage = 20 }) {
    logInfo('Fetching data')
    return axios({
      method: 'post',
      data: {
        param1: 'hello'
      },
      url: 'google.com'
    })
  }
}

