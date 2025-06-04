//          CODE ONE
// import { PrismaClient} from "@prisma/client"

// let prisma: PrismaClient

// declare const globalThis:{
//     prisma: PrismaClient
// }

// if (process.env.NODE_ENV === "production"){
//     prisma = new PrismaClient()
// } else {
//     if (!globalThis.prisma) {
//         globalThis.prisma = new PrismaClient()
//     }

//     prisma = globalThis.prisma
// }

// export default prisma

//          CODE TWO
// import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }

// let prisma: PrismaClient

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient()
// } else {
//   if (!global.prisma) {
//     global.prisma = new PrismaClient()
//   }
//   prisma = global.prisma
// }

// export default prisma

//          CODE THREE (Fixed for Next.js)
import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined
}

let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      log: ['query', 'error', 'warn'],
    });
  }
  prisma = global.prisma;
}

export default prisma;