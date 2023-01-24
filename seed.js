import * as dotenv from "dotenv";
dotenv.config();
import "./lib/connect.js";
import { faker } from "@faker-js/faker";
import Photo from "./models/Photo.js";
import { argv } from "node:process";
import Album from "./models/Album.js";

const deleteAll = async () => {
  return await Photo.deleteMany();
};
const deleteAllAlbum = async () => {
  return await Album.deleteMany();
};
const photoss = [];

const createPhoto = async () => {
  const photos = new Photo({
    title: faker.word.adjective(),
    description: faker.lorem.sentences(),
    url: faker.image.imageUrl(undefined, undefined, undefined, true),
    equipment: [
      {
        name: faker.name.firstName(),
        photograph: faker.name.fullName(),
      },
    ],
    settings: {
      focalLength: faker.random.numeric(),
      exposure: faker.random.numeric(2),
      aperture: faker.random.numeric(5),
      iso: faker.random.numeric(3),
      whiteBalance: faker.random.numeric(6),
    },
  });
  const res = await photos.save();
  photoss.push(res._id);
};

const createAlbum = async (i) => {
  const album = new Album({
    name: faker.word.noun(),
    description: faker.lorem.sentences(2),

    photos: photoss.slice(i * 4, (i + 1) * 4),
  });
  await album.save();
};
const createAlbums = async (count = 4) => {
  for (let i = 0; i < count; i++) {
    console.log("creating album: ", i + 1);
    await createAlbum(i);
  }
};

const postPhoto = async (count = 20) => {
  for (let i = 0; i < count; i++) {
    console.log("creating photos: ", i + 1);
    await createPhoto();
  }
};

try {
  if (!argv.includes("donotDelete")) {
    
    await deleteAllAlbum();
    await deleteAll();
  }
  const x = argv[2] === "donotDelete" ? undefined : argv[2];
  await postPhoto(x);
  await createAlbums(x);

  process.exit(0);
} catch (error) {
  console.error(error);
  process.exit(1);
}
