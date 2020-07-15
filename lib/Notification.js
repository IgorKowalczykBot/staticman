'use strict'

const path = require('path')
const config = require(path.join(__dirname, '/../config'))

const Notification = function (mailAgent) {
  this.mailAgent = mailAgent
}

Notification.prototype._buildMessage = function (fields, options, data) {
  return `
  <html>
    <body>
      Hi!,<br>
      <br>
      Ktoś odpowiedział na komentarz który zasubskrybowałeś/aś. Został on wysłany na ${data.siteName ? ` on <strong>${data.siteName}</strong>` : ''}.<br>
      <br>
      ${options.origin ? `<a href="${options.origin}">Kliknij tutaj</a> aby go zobaczyć.` : ''} Jeśli nie chcesz otrzymywać dalej takich powiadomień, <a href="%mailing_list_unsubscribe_url%">kliknij tutaj</a>.<br>
      <br>
      #ftw,<br>
      -- Wiadomość wysłana automatycznie, proszę na nią nie odpowiadać
    </body>
  </html>
  `
}

Notification.prototype.send = function (to, fields, options, data) {
  const subject = data.siteName ? `Nowa odpowiedź "${data.siteName}"` : 'Nowa odpowiedź'

  return new Promise((resolve, reject) => {
    this.mailAgent.messages().send({
      from: `Igor Kowalczyk Blog <${config.get('email.fromAddress')}>`,
      to,
      subject,
      html: this._buildMessage(fields, options, data)
    }, (err, res) => {
      if (err) {
        return reject(err)
      }

      return resolve(res)
    })
  })
}

module.exports = Notification
