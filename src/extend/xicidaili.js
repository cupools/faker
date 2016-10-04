export const host = 'http://www.xicidaili.com/nn/%d'
export const process = function(error, $) {
  if (error) {
    console.error(error)
    return []
  }

  let ret = []
  let host = ''
  let port = ''

  $('#ip_list td').map((index, item) => {
    let text = $(item).text()

    if (/^(\d+?\.?){4}$/.exec(text)) {
      host = text.trim()
    } else if (/^\d{1,4}$/.exec(text)) {
      port = text.trim()
      ret.push('http://' + host + ':' + port)
    }
  })

  return ret
}
