-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema educational_platform
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema educational_platform
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `educational_platform` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `educational_platform` ;

-- -----------------------------------------------------
-- Table `educational_platform`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(50) NOT NULL,
  `last_name` VARCHAR(50) NOT NULL,
  `email` VARCHAR(100) NULL DEFAULT NULL,
  `password_hash` VARCHAR(250) NULL DEFAULT NULL,
  `role` ENUM('student', 'teacher', 'administrator') NOT NULL,
  `disabled` TINYINT(1) NOT NULL,
  `_created_at` DATE NOT NULL,
  `_updated_at` DATE NULL,
  `_deleted_at` DATE NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`course`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`course` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `teacher_id` INT NULL DEFAULT NULL,
  `_created_at` DATE NOT NULL,
  `_updated_at` DATE NULL,
  `_deleted_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `teacher_id` (`teacher_id` ASC) VISIBLE,
  CONSTRAINT `course_ibfk_1`
    FOREIGN KEY (`teacher_id`)
    REFERENCES `educational_platform`.`user` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`analytic`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`analytic` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `course_id` INT NULL DEFAULT NULL,
  `completion_rate` FLOAT NULL DEFAULT NULL,
  `engagement_rate` FLOAT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `analytic_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `educational_platform`.`user` (`id`),
  CONSTRAINT `analytic_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `educational_platform`.`course` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`lecture`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`lecture` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `content` VARCHAR(300) NULL DEFAULT NULL,
  `course_id` INT NULL DEFAULT NULL,
  `_created_at` DATE NOT NULL,
  `_updated_at` DATE NULL,
  `_deleted_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `lecture_ibfk_1`
    FOREIGN KEY (`course_id`)
    REFERENCES `educational_platform`.`course` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`assessment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`assessment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(50) NULL DEFAULT NULL,
  `description` VARCHAR(300) NULL DEFAULT NULL,
  `type` ENUM('quiz', 'assignment', 'exam') NOT NULL,
  `solution` VARCHAR(300) NULL DEFAULT NULL,
  `lecture_id` INT NULL DEFAULT NULL,
  `_created_at` DATE NOT NULL,
  `_updated_at` DATE NULL,
  `_deleted_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `lecture_id` (`lecture_id` ASC) VISIBLE,
  CONSTRAINT `assessment_ibfk_1`
    FOREIGN KEY (`lecture_id`)
    REFERENCES `educational_platform`.`lecture` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`assessment_submission`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`assessment_submission` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `assessment_id` INT NULL DEFAULT NULL,
  `submission_date` DATETIME NULL DEFAULT NULL,
  `score` FLOAT NULL DEFAULT NULL,
  `grade` VARCHAR(20) NULL DEFAULT NULL,
  `feedback` VARCHAR(250) NULL DEFAULT NULL,
  `_created_at` DATE NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `assessment_id` (`assessment_id` ASC) VISIBLE,
  CONSTRAINT `assessment_submission_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `educational_platform`.`user` (`id`),
  CONSTRAINT `assessment_submission_ibfk_2`
    FOREIGN KEY (`assessment_id`)
    REFERENCES `educational_platform`.`assessment` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`course_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`course_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(20) NULL DEFAULT NULL,
  `description` VARCHAR(250) NULL DEFAULT NULL,
  `file_url` VARCHAR(300) NULL DEFAULT NULL,
  `course_id` INT NULL DEFAULT NULL,
  `_created_at` DATE NOT NULL,
  `_updated_at` DATE NULL,
  `_deleted_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `course_material_ibfk_1`
    FOREIGN KEY (`course_id`)
    REFERENCES `educational_platform`.`course` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `educational_platform`.`enrollment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `educational_platform`.`enrollment` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user_id` INT NULL DEFAULT NULL,
  `course_id` INT NULL DEFAULT NULL,
  `_created_at` DATE NOT NULL,
  `_deleted_at` DATE NULL,
  PRIMARY KEY (`id`),
  INDEX `user_id` (`user_id` ASC) VISIBLE,
  INDEX `course_id` (`course_id` ASC) VISIBLE,
  CONSTRAINT `enrollment_ibfk_1`
    FOREIGN KEY (`user_id`)
    REFERENCES `educational_platform`.`user` (`id`),
  CONSTRAINT `enrollment_ibfk_2`
    FOREIGN KEY (`course_id`)
    REFERENCES `educational_platform`.`course` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
