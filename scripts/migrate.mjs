import { neon } from "@neondatabase/serverless";
import { readFile } from "node:fs/promises";
const sql = neon(process.env.DATABASE_URL);
const source = (
  await Promise.all(
    ["schema.sql", "route-v2.sql"].map((file) =>
      readFile(new URL(`../db/${file}`, import.meta.url), "utf8"),
    ),
  )
).join("\n");
const statements = [];
let buffer = "";
let inFunction = false;
for (let i = 0; i < source.length; i++) {
  if (source.slice(i, i + 2) === "$$") {
    inFunction = !inFunction;
    buffer += "$$";
    i++;
    continue;
  }
  buffer += source[i];
  if (source[i] === ";" && !inFunction) {
    statements.push(buffer);
    buffer = "";
  }
}
if (buffer.trim()) statements.push(buffer);
await sql.transaction(statements.map((statement) => sql.query(statement)));
console.log("Treasure Expedition schema applied.");
