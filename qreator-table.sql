DROP TABLE IF EXISTS qrcodes;

CREATE TABLE qrcodes (
  id         serial, 
  url        text,
  name       text,
  description text,
  qr          text
);
