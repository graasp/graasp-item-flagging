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
