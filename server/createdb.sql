BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS "users" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"email"	TEXT,
	"name"	TEXT,
	"salt"	TEXT,
	"password"	TEXT
);

CREATE TABLE IF NOT EXISTS "planes" (
	"id"	INTEGER PRIMARY KEY AUTOINCREMENT,
	"name" TEXT,
	"type"	TEXT
);

CREATE TABLE IF NOT EXISTS "seats" (
	"seat"	TEXT,
	"idPlane"	INTEGER,
	"idUser"	INTEGER
);


INSERT INTO "users" VALUES (1,'zahra@test.com','zahra', '123348dusd437840', 'bddfdc9b092918a7f65297b4ba534dfe306ed4d5d72708349ddadb99b1c526fb'); /* password='pwd' */
INSERT INTO "users" VALUES (2,'wille@test.com','wille',   '7732qweydg3sd637', '498a8d846eb4efebffc56fc0de16d18905714cf12edf548b8ed7a4afca0f7c1c');
INSERT INTO "users" VALUES (3,'simon@test.com','simon',   'wgb32sge2sh7hse7', '09a79c91c41073e7372774fcb114b492b2b42f5e948c61d775ad4f628df0e160');
INSERT INTO "users" VALUES (4,'lorenzo@test.com','lorenzo',   'safd6523tdwt82et', '330f9bd2d0472e3ca8f11d147d01ea210954425a17573d0f6b8240ed503959f8');
INSERT INTO "users" VALUES (5,'chloe@test.com','chloe',   'ad37JHUW38wj2833', 'bbbcbac88d988bce98cc13e4c9308306d621d9e278ca62aaee2d156f898a41dd');
INSERT INTO "planes" VALUES (1, 'Plane 1', 'Local');
INSERT INTO "planes" VALUES (2, 'Plane 2', 'Regional');
INSERT INTO "planes" VALUES (3, 'Plane 3', 'International');
INSERT INTO "seats" ("seat", "idPlane", "idUser") VALUES
('1A', 1, NULL), ('1B', 1, 1), ('1C', 1, NULL), ('1D', 1, NULL),
('2A', 1, NULL), ('2B', 1, 1), ('2C', 1, NULL), ('2D', 1, NULL),
('3A', 1, NULL), ('3B', 1, 1), ('3C', 1, NULL), ('3D', 1, NULL),
('4A', 1, NULL), ('4B', 1, NULL), ('4C', 1, NULL), ('4D', 1, NULL),
('5A', 1, NULL), ('5B', 1, NULL), ('5C', 1, NULL), ('5D', 1, NULL),
('6A', 1, NULL), ('6B', 1, NULL), ('6C', 1, NULL), ('6D', 1, NULL),
('7A', 1, NULL), ('7B', 1, NULL), ('7C', 1, NULL), ('7D', 1, NULL),
('8A', 1, NULL), ('8B', 1, NULL), ('8C', 1, NULL), ('8D', 1, NULL),
('9A', 1, NULL), ('9B', 1, NULL), ('9C', 1, NULL), ('9D', 1, NULL),
('10A', 1, NULL), ('10B', 1, NULL), ('10C', 1, NULL), ('10D', 1, NULL),
('11A', 1, NULL), ('11B', 1, NULL), ('11C', 1, NULL), ('11D', 1, NULL),
('12A', 1, NULL), ('12B', 1, NULL), ('12C', 1, NULL), ('12D', 1, NULL),
('13A', 1, NULL), ('13B', 1, NULL), ('13C', 1, NULL), ('13D', 1, NULL),
('14A', 1, NULL), ('14B', 1, NULL), ('14C', 1, NULL), ('14D', 1, NULL),
('15A', 1, NULL), ('15B', 1, NULL), ('15C', 1, NULL), ('15D', 1, NULL);

INSERT INTO "seats" ("seat", "idPlane", "idUser") VALUES
('1A', 2, NULL), ('1B', 2, NULL), ('1C', 2, NULL), ('1D', 2, NULL), ('1E', 2, NULL),
('2A', 2, NULL), ('2B', 2, NULL), ('2C', 2, NULL), ('2D', 2, NULL), ('2E', 2, NULL),
('3A', 2, NULL), ('3B', 2, NULL), ('3C', 2, NULL), ('3D', 2, NULL), ('3E', 2, NULL),
('4A', 2, NULL), ('4B', 2, NULL), ('4C', 2, NULL), ('4D', 2, NULL), ('4E', 2, NULL),
('5A', 2, NULL), ('5B', 2, NULL), ('5C', 2, NULL), ('5D', 2, NULL), ('5E', 2, NULL),
('6A', 2, NULL), ('6B', 2, NULL), ('6C', 2, NULL), ('6D', 2, NULL), ('6E', 2, NULL),
('7A', 2, NULL), ('7B', 2, NULL), ('7C', 2, NULL), ('7D', 2, NULL), ('7E', 2, NULL),
('8A', 2, NULL), ('8B', 2, NULL), ('8C', 2, NULL), ('8D', 2, NULL), ('8E', 2, NULL),
('9A', 2, NULL), ('9B', 2, NULL), ('9C', 2, NULL), ('9D', 2, NULL), ('9E', 2, NULL),
('10A', 2, 2), ('10B', 2, 2), ('10C', 2, 2), ('10D', 2, NULL), ('10E', 2, NULL),
('11A', 2, NULL), ('11B', 2, NULL), ('11C', 2, NULL), ('11D', 2, NULL), ('11E', 2, NULL),
('12A', 2, NULL), ('12B', 2, NULL), ('12C', 2, NULL), ('12D', 2, NULL), ('12E', 2, NULL),
('13A', 2, NULL), ('13B', 2, NULL), ('13C', 2, NULL), ('13D', 2, NULL), ('13E', 2, NULL),
('14A', 2, NULL), ('14B', 2, NULL), ('14C', 2, NULL), ('14D', 2, NULL), ('14E', 2, NULL),
('15A', 2, NULL), ('15B', 2, NULL), ('15C', 2, NULL), ('15D', 2, NULL), ('15E', 2, NULL),
('16A', 2, NULL), ('16B', 2, NULL), ('16C', 2, NULL), ('16D', 2, NULL), ('16E', 2, NULL),
('17A', 2, NULL), ('17B', 2, NULL), ('17C', 2, NULL), ('17D', 2, NULL), ('17E', 2, NULL),
('18A', 2, NULL), ('18B', 2, NULL), ('18C', 2, NULL), ('18D', 2, NULL), ('18E', 2, NULL),
('19A', 2, NULL), ('19B', 2, NULL), ('19C', 2, NULL), ('19D', 2, NULL), ('19E', 2, NULL),
('20A', 2, NULL), ('20B', 2, NULL), ('20C', 2, NULL), ('20D', 2, NULL), ('20E', 2, NULL);

INSERT INTO "seats" ("seat", "idPlane", "idUser") VALUES
('1A', 3, NULL), ('1B', 3, NULL), ('1C', 3, NULL), ('1D', 3, NULL), ('1E', 3, NULL), ('1F', 3, NULL),
('2A', 3, NULL), ('2B', 3, NULL), ('2C', 3, NULL), ('2D', 3, NULL), ('2E', 3, NULL), ('2F', 3, NULL),
('3A', 3, NULL), ('3B', 3, NULL), ('3C', 3, NULL), ('3D', 3, NULL), ('3E', 3, NULL), ('3F', 3, NULL),
('4A', 3, NULL), ('4B', 3, NULL), ('4C', 3, NULL), ('4D', 3, NULL), ('4E', 3, NULL), ('4F', 3, NULL),
('5A', 3, NULL), ('5B', 3, NULL), ('5C', 3, NULL), ('5D', 3, NULL), ('5E', 3, NULL), ('5F', 3, NULL),
('6A', 3, NULL), ('6B', 3, NULL), ('6C', 3, NULL), ('6D', 3, NULL), ('6E', 3, NULL), ('6F', 3, NULL),
('7A', 3, NULL), ('7B', 3, NULL), ('7C', 3, NULL), ('7D', 3, NULL), ('7E', 3, NULL), ('7F', 3, NULL),
('8A', 3, NULL), ('8B', 3, NULL), ('8C', 3, NULL), ('8D', 3, NULL), ('8E', 3, NULL), ('8F', 3, NULL),
('9A', 3, NULL), ('9B', 3, NULL), ('9C', 3, NULL), ('9D', 3, NULL), ('9E', 3, NULL), ('9F', 3, NULL),
('10A', 3, NULL), ('10B', 3, 4), ('10C', 3, 4), ('10D', 3, 4), ('10E', 3, 4), ('10F', 3, NULL),
('11A', 3, NULL), ('11B', 3, NULL), ('11C', 3, NULL), ('11D', 3, NULL), ('11E', 3, NULL), ('11F', 3, NULL),
('12A', 3, NULL), ('12B', 3, NULL), ('12C', 3, NULL), ('12D', 3, NULL), ('12E', 3, NULL), ('12F', 3, NULL),
('13A', 3, NULL), ('13B', 3, NULL), ('13C', 3, NULL), ('13D', 3, NULL), ('13E', 3, NULL), ('13F', 3, NULL),
('14A', 3, NULL), ('14B', 3, NULL), ('14C', 3, NULL), ('14D', 3, NULL), ('14E', 3, NULL), ('14F', 3, NULL),
('15A', 3, NULL), ('15B', 3, NULL), ('15C', 3, NULL), ('15D', 3, NULL), ('15E', 3, NULL), ('15F', 3, NULL),
('16A', 3, NULL), ('16B', 3, NULL), ('16C', 3, NULL), ('16D', 3, NULL), ('16E', 3, NULL), ('16F', 3, NULL),
('17A', 3, NULL), ('17B', 3, NULL), ('17C', 3, NULL), ('17D', 3, NULL), ('17E', 3, NULL), ('17F', 3, NULL),
('18A', 3, NULL), ('18B', 3, NULL), ('18C', 3, NULL), ('18D', 3, NULL), ('18E', 3, NULL), ('18F', 3, NULL),
('19A', 3, NULL), ('19B', 3, NULL), ('19C', 3, NULL), ('19D', 3, NULL), ('19E', 3, NULL), ('19F', 3, NULL),
('20A', 3, NULL), ('20B', 3, NULL), ('20C', 3, NULL), ('20D', 3, NULL), ('20E', 3, NULL), ('20F', 3, NULL),
('21A', 3, NULL), ('21B', 3, NULL), ('21C', 3, NULL), ('21D', 3, NULL), ('21E', 3, NULL), ('21F', 3, NULL),
('22A', 3, NULL), ('22B', 3, NULL), ('22C', 3, NULL), ('22D', 3, NULL), ('22E', 3, NULL), ('22F', 3, NULL),
('23A', 3, NULL), ('23B', 3, NULL), ('23C', 3, NULL), ('23D', 3, NULL), ('23E', 3, NULL), ('23F', 3, NULL),
('24A', 3, NULL), ('24B', 3, NULL), ('24C', 3, NULL), ('24D', 3, NULL), ('24E', 3, NULL), ('24F', 3, NULL),
('25A', 3, NULL), ('25B', 3, NULL), ('25C', 3, NULL), ('25D', 3, NULL), ('25E', 3, NULL), ('25F', 3, NULL);

COMMIT;