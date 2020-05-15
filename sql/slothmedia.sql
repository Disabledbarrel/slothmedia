--
-- Databas: slothmedia
--

-- --------------------------------------------------------
--
/* Tabellstruktur appuser */
CREATE TABLE appuser (
  user_id int(11) NOT NULL AUTO_INCREMENT,
  email varchar(155) NOT NULL,
  password varchar(155) NOT NULL,
  user_name varchar(155) NOT NULL,
  avatar varchar(155),
  UNIQUE (user_name),
  PRIMARY KEY (user_id)
);

/* Tabellstruktur playlist */
CREATE TABLE playlist (
  playlist_id int(11) NOT NULL AUTO_INCREMENT,
  playlist_name varchar(155) NOT NULL,
  user_id int(11) NOT NULL,
  public_type boolean,
  PRIMARY KEY (playlist_id),
  FOREIGN KEY (user_id) REFERENCES appuser(user_id)
);

/* Tabellstruktur song */
CREATE TABLE song (
  song_id int(11) NOT NULL AUTO_INCREMENT,
  song_url varchar(155) NOT NULL,
  playlist_id int(11) NOT NULL,
  song_name varchar(155) NOT NULL,
  PRIMARY KEY (song_id),
  FOREIGN KEY (playlist_id)
    REFERENCES playlist(playlist_id)
    ON DELETE CASCADE
);

/* Tabellstruktur share */
CREATE TABLE share (
  user_id int(11) NOT NULL,
  playlist_id int(11) NOT NULL,
  share_type varchar(155) NOT NULL,
  PRIMARY KEY (user_id, playlist_id),
  FOREIGN KEY (playlist_id)
    REFERENCES playlist(playlist_id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES appuser(user_id)
);

/* Tabellstruktur comments */
CREATE TABLE user_comment (
  comment_id int(11) NOT NULL AUTO_INCREMENT,
  playlist_id int(11) NOT NULL,
  user_id int(11) NOT NULL,
  content varchar(155) DEFAULT NULL,
  created timestamp NOT NULL,
  PRIMARY KEY (comment_id),
  FOREIGN KEY (playlist_id)
    REFERENCES playlist(playlist_id)
    ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES appuser(user_id)
);
