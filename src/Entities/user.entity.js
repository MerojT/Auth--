import { EntitySchema } from "typeorm";

export const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      type: "uuid",
      primary: true,
      generated: "uuid",
    },
    username: {
      type: "varchar",
      unique: true,
      nullable: false,
    },
    password: {
      type: "varchar",
      nullable: false,
    },
    role: {
      type: "varchar",
      default: "user",
    },
    refreshToken: {
    type: "text",
    nullable: true,
    },
  },
});