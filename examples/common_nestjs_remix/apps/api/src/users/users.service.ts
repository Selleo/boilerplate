import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { eq } from "drizzle-orm";
import { DatabasePg } from "src/common";
import { user } from "src/storage/schema";

@Injectable()
export class UsersService {
  constructor(@Inject("DB") private readonly db: DatabasePg) {}

  public async getUsers() {
    const allUsers = await this.db.select().from(user);

    return allUsers;
  }

  public async getUserById(id: string) {
    const [existingUser] = await this.db
      .select()
      .from(user)
      .where(eq(user.id, id));

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    return existingUser;
  }

  public async updateUser(id: string, data: { email?: string }) {
    const [existingUser] = await this.db
      .select()
      .from(user)
      .where(eq(user.id, id));

    if (!existingUser) {
      throw new NotFoundException("User not found");
    }

    const [updatedUser] = await this.db
      .update(user)
      .set(data)
      .where(eq(user.id, id))
      .returning();

    return updatedUser;
  }

  public async deleteUser(id: string) {
    const [deletedUser] = await this.db
      .delete(user)
      .where(eq(user.id, id))
      .returning();

    if (!deletedUser) {
      throw new NotFoundException("User not found");
    }
  }
}
