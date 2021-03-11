import {MigrationInterface, QueryRunner} from "typeorm";

export class migration1614847225452 implements MigrationInterface {
    name = 'migration1614847225452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "course" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "name" varchar NOT NULL, "startTime" integer NOT NULL, "endTime" integer NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "user_profile" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "firstname" varchar NOT NULL, "surname" varchar NOT NULL, "email" varchar NOT NULL, "birthdate" integer NOT NULL, "sex" varchar NOT NULL, "jobTitle" varchar NOT NULL, "introducedBy" varchar NOT NULL, "address" varchar NOT NULL, "secondPhone" varchar NOT NULL, "education" varchar NOT NULL, "country" varchar NOT NULL, "city" varchar NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "sessions" ("id" varchar(44) PRIMARY KEY NOT NULL, "user_id" integer, "content" text NOT NULL, "flash" text NOT NULL, "updated_at" integer NOT NULL, "created_at" integer NOT NULL)`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "role" varchar NOT NULL, "userProfileId" integer, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "REL_2ffc8d3455097079866bfca4d4" UNIQUE ("userProfileId"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_courses_course" ("userId" integer NOT NULL, "courseId" integer NOT NULL, PRIMARY KEY ("userId", "courseId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e99d8f99eff1a45a772b11060e" ON "user_courses_course" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d67262674f71493825eb35e2e2" ON "user_courses_course" ("courseId") `, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "role" varchar NOT NULL, "userProfileId" integer, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "REL_2ffc8d3455097079866bfca4d4" UNIQUE ("userProfileId"), CONSTRAINT "FK_2ffc8d3455097079866bfca4d47" FOREIGN KEY ("userProfileId") REFERENCES "user_profile" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user"("id", "password", "phone", "role", "userProfileId") SELECT "id", "password", "phone", "role", "userProfileId" FROM "user"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user" RENAME TO "user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e99d8f99eff1a45a772b11060e"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d67262674f71493825eb35e2e2"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_user_courses_course" ("userId" integer NOT NULL, "courseId" integer NOT NULL, CONSTRAINT "FK_e99d8f99eff1a45a772b11060e5" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, CONSTRAINT "FK_d67262674f71493825eb35e2e2c" FOREIGN KEY ("courseId") REFERENCES "course" ("id") ON DELETE CASCADE ON UPDATE NO ACTION, PRIMARY KEY ("userId", "courseId"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_user_courses_course"("userId", "courseId") SELECT "userId", "courseId" FROM "user_courses_course"`, undefined);
        await queryRunner.query(`DROP TABLE "user_courses_course"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_user_courses_course" RENAME TO "user_courses_course"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e99d8f99eff1a45a772b11060e" ON "user_courses_course" ("userId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d67262674f71493825eb35e2e2" ON "user_courses_course" ("courseId") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "IDX_d67262674f71493825eb35e2e2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e99d8f99eff1a45a772b11060e"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_courses_course" RENAME TO "temporary_user_courses_course"`, undefined);
        await queryRunner.query(`CREATE TABLE "user_courses_course" ("userId" integer NOT NULL, "courseId" integer NOT NULL, PRIMARY KEY ("userId", "courseId"))`, undefined);
        await queryRunner.query(`INSERT INTO "user_courses_course"("userId", "courseId") SELECT "userId", "courseId" FROM "temporary_user_courses_course"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user_courses_course"`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d67262674f71493825eb35e2e2" ON "user_courses_course" ("courseId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e99d8f99eff1a45a772b11060e" ON "user_courses_course" ("userId") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" RENAME TO "temporary_user"`, undefined);
        await queryRunner.query(`CREATE TABLE "user" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "password" varchar NOT NULL, "phone" varchar NOT NULL, "role" varchar NOT NULL, "userProfileId" integer, CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone"), CONSTRAINT "REL_2ffc8d3455097079866bfca4d4" UNIQUE ("userProfileId"))`, undefined);
        await queryRunner.query(`INSERT INTO "user"("id", "password", "phone", "role", "userProfileId") SELECT "id", "password", "phone", "role", "userProfileId" FROM "temporary_user"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_user"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d67262674f71493825eb35e2e2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e99d8f99eff1a45a772b11060e"`, undefined);
        await queryRunner.query(`DROP TABLE "user_courses_course"`, undefined);
        await queryRunner.query(`DROP TABLE "user"`, undefined);
        await queryRunner.query(`DROP TABLE "sessions"`, undefined);
        await queryRunner.query(`DROP TABLE "user_profile"`, undefined);
        await queryRunner.query(`DROP TABLE "course"`, undefined);
    }

}
