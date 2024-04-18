// import {MyContext} from "../types";
// import {Context} from "telegraf";
//
// const rateLimit = require('telegraf-ratelimit')
//
// export function attachRateLimit() {
//     return rateLimit({
//         window: 3000,
//         limit: 1,
//         onLimitExceeded: ({
//                               answerCbQuery,
//                               from,
//                               updateType,
//                               i18n,
//                               whois
//                           }: Context) => {
//             console.log(`Flood from: ${whois(from)}`)
//             if (updateType === 'callback_query') {
//                 answerCbQuery(i18n.t('stop_flood'))
//             }
//         }
//     })
// }
