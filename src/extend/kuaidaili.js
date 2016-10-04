export const host = 'http://www.kuaidaili.com/free/inha/%d/'
export const process = function(error, $) {
  if (error) {
    console.error(error)
    return []
  }

  let ret = []
  let host = ''
  let port = ''

  $('#list td').map((index, item) => {
    let text = $(item).text()

    if (/^(\d+?\.){3}\d+?$/.exec(text)) {
      host = text.trim()
    } else if (/^\d{1,4}$/.exec(text)) {
      port = text.trim()
      ret.push('http://' + host + ':' + port)
    }
  })

  return ret
}
