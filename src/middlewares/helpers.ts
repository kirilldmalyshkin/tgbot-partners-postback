// import {MyContext} from "../types";
// // import { ExtraSendMessage, User } from 'telegraf/typings/telegram-types'
//
// export async function attachHelpers(ctx: MyContext, next: () => void) {
//     const replyWithLocalization = async (
//         resourceKey: string,
//         extra?: ExtraSendMessage
//     ) => {
//         return ctx.reply(ctx.i18n.t(resourceKey), extra)
//     }
//
//     // ctx.replyWithLocalization = replyWithLocalization
//     ctx.whois = whois
//     return next()
// }
//
// const whois = ({from}: MyContext) => {
//     if (from) {
//         const id = from.id
//         const firstName = from.first_name
//         const lastName = from.last_name || ''
//         return `${id}:${firstName}` + ` ${lastName}`
//     } else {
//         return 'unknown'
//     }
// }
