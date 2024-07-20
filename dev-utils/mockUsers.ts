import { faker } from "@faker-js/faker";
export const mockUsers = Array.from({ length: 10 }, () => ({
  id: faker.string.uuid(),
  name: faker.person.firstName(),
  email: faker.internet.email(),
}));
