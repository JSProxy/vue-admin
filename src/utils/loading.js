import {
  Loading
} from 'element-ui'

let loading;
let needLoadingRequestCount = 0; //请求数
function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

const tryCloseLoading = () => {
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}

export function showLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}

export function HideLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    //延迟300ms 以防  最后一次请求后 还有请完成  造成闪屏
    setTimeout(() => {
      tryCloseLoading()
    }, 300);
  }
}