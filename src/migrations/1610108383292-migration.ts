import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1610108383292 implements MigrationInterface {
    name = 'migration1610108383292'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "teacher" varchar NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "family" varchar NOT NULL, "birthDate" integer NOT NULL, "phone" varchar NOT NULL, "coursesId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "family" varchar NOT NULL, "birthDate" integer NOT NULL, "phone" varchar NOT NULL, "coursesId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "FK_493ccbebdd377fc4eaf7b61acc4" FOREIGN KEY ("coursesId") REFERENCES "course" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "email", "password", "name", "family", "birthDate", "phone", "coursesId") SELECT "id", "email", "password", "name", "family", "birthDate", "phone", "coursesId" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "email" varchar NOT NULL, "password" varchar NOT NULL, "name" varchar NOT NULL, "family" varchar NOT NULL, "birthDate" integer NOT NULL, "phone" varchar NOT NULL, "coursesId" integer, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "email", "password", "name", "family", "birthDate", "phone", "coursesId") SELECT "id", "email", "password", "name", "family", "birthDate", "phone", "coursesId" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
    }

}
