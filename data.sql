CREATE TABLE Events (
    event_id serial PRIMARY KEY NOT NULL,
    event_name varchar(50) NOT NULL,
    industry varchar(50) NOT NULL,
    event_type varchar(255) NOT NULL,
    event_description text NOT NULL,
    host_id integer NOT NULL,
    total_attendees integer NOT NULL,
    event_location text NOT NULL,
    event_status boolean NOT NULL,
    date_time timestamp NOT NULL,
    picture bytea NOT NULL
) WITH (
    OIDS = False
);

CREATE TABLE Users (
    user_id serial PRIMARY KEY,
    username varchar(50) UNIQUE NOT NULL,
    password_ varchar(50) NOT NULL,
    first_name varchar(50) NOT NULL,
    last_name varchar(50) NOT NULL,
    email varchar(255) NOT NULL,
    bio text,
    industry varchar(255) NOT NULL,
    user_resume bytea,
    picture bytea 
) WITH (
    OIDS = False
);

CREATE TABLE Attendees (
    _id serial PRIMARY KEY NOT NULL,
    event_id integer REFERENCES Events(event_id) NOT NULL,
    user_id integer REFERENCES Users(user_id) NOT NULL
) WITH (
    OIDS = False
);

