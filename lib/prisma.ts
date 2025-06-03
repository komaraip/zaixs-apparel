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

//          CODE THREE
import { PrismaClient } from "@prisma/client";
import fs from 'fs';
import path from 'path';

declare global {
  var prisma: PrismaClient | undefined
}

const loadEnvVars = () => {
  if (!process.env.DATABASE_URL) {
    try {
      const envFile = fs.readFileSync(path.join(process.cwd(), '.env'), 'utf-8');
      
      envFile.split('\n').forEach((line: string) => {
        const match = line.match(/^(\w+)=(.*)$/);
        if (match) {
          const [, key, value] = match;
          if (key && !process.env[key]) {
            process.env[key] = value.replace(/^["']|["']$/g, '');
          }
        }
      });
    } catch (error) {
      console.warn('Failed to load .env file directly:', error);
    }
  }
};

loadEnvVars();

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