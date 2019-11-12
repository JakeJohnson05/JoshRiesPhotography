/*
 * This file exports functions that compile email html.
 * Mainly just so email.js doesn't get packed
 */

const bgColor = '#019CBB';

/**
 * Generate the template for a contact email
 * @param {string}	name
 * @param {string}	email
 * @param {string}	message
 * @param {string}	[company]
 * @param {string}	[url]
 * @return {string}
 */
const genContactEmail = (name, email, message, company = undefined, url = undefined) => `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd" /><html lang=en xmlns=http://www.w3.org/1999/xhtml xmlns:o=urn:schemas-microsoft-com:office:office xmlns:v=urn:schemas-microsoft-com:vml><meta content="text/html; charset=UTF-8"http-equiv=Content-Type><meta content="width=device-width,initial-scale=1"name=viewport><meta name=x-apple-disable-message-reformatting><!--[if !mso]><!--><meta content="IE=edge"http-equiv=X-UA-Compatible><!--<![endif]--><style>*{text-size-adjust:100%;-ms-text-size-adjust:100%;-moz-text-size-adjust:100%;-webkit-text-size-adjust:100%}html{height:100%;width:100%}body{height:100%!important;margin:0!important;padding:0!important;width:100%!important;mso-line-height-rule:exactly}div[style*="margin: 16px 0"]{margin:0!important}table,td{mso-table-lspace:0;mso-table-rspace:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none;-ms-interpolation-mode:bicubic}.ExternalClass,.ReadMsgBody{width:100%}.ExternalClass,.ExternalClass div,.ExternalClass p,.ExternalClass span,.ExternalClass td{line-height:100%}</style><!--[if gte mso 9]><style>li{text-indent:-1em}table td{border-collapse:collapse}</style><![endif]--><title>Codexist Contact</title><link href="https://fonts.googleapis.com/css?family=Roboto:300"rel=stylesheet><!--[if gte mso 9]><xml><o:officedocumentsettings><o:allowpng><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml><![endif]--><body class=body style=margin:0;width:100%><table align=left border=0 cellpadding=0 cellspacing=0 class=bodyTable role=presentation width=100% style=width:100%;margin:0><tr><td align=left class=body__content valign=top width=100% style=color:#000;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px><div class=container style="margin:0 auto;width:100%;max-width:800px"><!--[if mso | IE]><table align=center border=0 cellpadding=0 cellspacing=0 class=container__table__ie role=presentation width=800 style=margin-right:auto;margin-left:auto;width:800px><tr><td><![endif]--><table align=center border=0 cellpadding=0 cellspacing=0 class=container__table role=presentation width=100%><tr class=container__row><td align=left class=container__cell valign=top width=100%><div class=block style=width:100%><!--[if mso | IE]><table class=block__table__ie role=presentation border=0 cellpadding=0 cellspacing=0 style=width:100% width=800><tr><td><![endif]--><table align=center border=0 cellpadding=0 cellspacing=0 class=block__table role=presentation width=100%><tr class=block__row><td align=left class=block__cell valign=top width=100%><p class="p text"style="display:block;margin:14px 0;color:#000;line-height:20px;padding-left:8px;font-family:Roboto;font-size:150%"><span style=color:red>CODE</span>XIST</table><!--[if mso | IE]><![endif]--></div><div class=block style=width:100%><!--[if mso | IE]><table class=block__table__ie role=presentation border=0 cellpadding=0 cellspacing=0 style=width:100% width=800><tr><td><![endif]--><table align=center border=0 cellpadding=0 cellspacing=0 class=block__table role=presentation width=100%><tr class=block__row><td align=left class=block__cell valign=top width=100%><p class="p text"style="display:block;margin:14px 0;color:#000;line-height:20px;font-family:Roboto;font-size:170%;text-align:center">Website Contact</table><!--[if mso | IE]><![endif]--></div><div class="block content"style="width:100%;margin:24px 0"><!--[if mso | IE]><table align=left border=0 cellpadding=0 cellspacing=0 class=block__table__ie role=presentation width=800 style=width:100%;margin-right:0;margin-left:0><tr><td><![endif]--><table align=center border=0 cellpadding=0 cellspacing=0 class=block__table role=presentation width=100%><tr class=block__row><td align=left class=block__cell valign=top width=100% style="border-bottom:1px solid #ccc;padding:0 0 16px"><div class=row style="background-color:${bgColor};padding:8px 16px"><table align=center border=0 cellpadding=0 cellspacing=0 class=row__table role=presentation width=100% style=table-layout:fixed><tr class=row__row><p class="p text"style="display:block;line-height:20px;padding:0 8px 8px;font-size:120%;color:#fff;font-family:Roboto;margin:0"large=6>${name}<p class="p text"style=display:block;font-size:16px;line-height:20px;color:#fff;font-family:Roboto;margin:0 large=6>${email}</table></div><div class=row style="padding:8px 24px"><table align=center border=0 cellpadding=0 cellspacing=0 class=row__table role=presentation width=100% style=table-layout:fixed><tr class=row__row>${company?`<p class="p text"style="display:block;margin:14px 0;color:#000;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px"large=4><span style=font-family:Roboto;font-size:90%;font-style:italic class=field-title>company:</span> ${company}</p>`:''}${url?`<p class="p text"style="display:block;margin:14px 0;color:#000;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px"large=4><span style=font-family:Roboto;font-size:90%;font-style:italic class=field-title>url:</span> ${url}</p>`:''}<p class="p text"style="display:block;margin:14px 0;color:#000;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px"large=4><span style=font-family:Roboto;font-size:90%;font-style:italic class=field-title>message:</span> ${message}</table></div><div class="row log-btn"><table align=center border=0 cellpadding=0 cellspacing=0 class=row__table role=presentation width=100% style=table-layout:fixed><tr class=row__row><p class="p text"style="display:block;margin:14px 0;color:#000;font-family:Helvetica,Arial,sans-serif;font-size:16px;line-height:20px;text-align:center"large=12><a class=a href=mailto:${email} style="padding:8px 16px;background-color:${bgColor};color:#fff;text-decoration:none"><span style=color:#fff;text-decoration:none class=a__text>Reply</span></a></table></div></table><!--[if mso | IE]><![endif]--></div></table><!--[if mso | IE]><![endif]--></div></table><div style=display:none;white-space:nowrap;font-size:15px;line-height:0>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; </div></body></html>`;

module.exports = { genContactEmail };
