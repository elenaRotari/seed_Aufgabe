import * as dotenv from "dotenv";
dotenv.config();

import "./lib/connect.js";
import { faker } from "@faker-js/faker";
import Facker from "./models/Photo.js";
import { argv } from "node:process";

const deleteAll = async () => {
  return await Facker.deleteMany();
};

const createFacker = async () => {
  const facker = new Facker({
    title: faker.word.adjective(),
    description: faker.lorem.sentences(),
    url: faker.image.imageUrl(undefined, undefined, undefined, true),
  });
  await facker.save();
};

const postfacker = async (count = 20) => {
  for (let i = 0; i < count; i++) {
    console.log("creating seedfackers: ", i + 1);
    await createFacker();
  }
};

try {
  if (!argv.includes("donotDelete")) {
    await deleteAll();
  }
  const x = argv[2] === "donotDelete" ? undefined : argv[2];
  await postfacker(x);

  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
