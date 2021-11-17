CREATE TABLE "flag" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "name" character varying(100) NOT NULL
);

CREATE TABLE "item_flag" (
  "id" uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  "flag_id" uuid REFERENCES "flag" ("id") ON DELETE CASCADE,
  "item_id" uuid REFERENCES "item" ("id") ON DELETE CASCADE,
  "creator" uuid REFERENCES "member" ("id") ON DELETE SET NULL,
  "created_at" timestamp NOT NULL DEFAULT (NOW() AT TIME ZONE 'utc')
);

INSERT INTO flag VALUES ('053d9c35-182e-41d8-9f1f-2f5b443d0fbd', 'Inappropriate Content');
INSERT INTO flag VALUES ('69f652a7-9c04-4346-b963-004e63c478b9', 'Hate speech');
INSERT INTO flag VALUES ('a1ebd159-416a-404b-b893-02a7064454db', 'Fraud / Plagiarism');
INSERT INTO flag VALUES ('7463afaa-a74e-4a5c-810c-44f9642c87c5', 'Spam');
INSERT INTO flag VALUES ('ca6d1841-fabc-4444-b86e-b76af41263c1', 'Targeted Harrasment');
INSERT INTO flag VALUES ('9baecb0e-3dc3-4191-bbf7-2a89d304600b', 'False Information');
